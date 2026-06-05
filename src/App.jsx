import React, { useState, useEffect, useMemo } from 'react';
import { Check, Calendar, Home, ChevronLeft, ChevronRight, Flame, Trophy, Info, X } from 'lucide-react';
import {
  PRP_DATE,
  TOTAL_DAYS,
  parseISODate,
  toISODate,
  dayNumberForDate,
  workoutForDate,
} from './protocol.js';

// ============================================================
// STORAGE — localStorage with async wrapper for portability
// ============================================================
const STORAGE_KEY = 'comeback_completions_v1';
const storage = {
  async get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  async set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },
};

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  const [view, setView] = useState('today');
  const [todayISO, setTodayISO] = useState(toISODate(new Date()));
  const [completions, setCompletions] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [infoEx, setInfoEx] = useState(null);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      const raw = await storage.get(STORAGE_KEY);
      if (raw) {
        try { setCompletions(JSON.parse(raw)); } catch { setCompletions({}); }
      }
      setLoaded(true);
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded) return;
    storage.set(STORAGE_KEY, JSON.stringify(completions));
  }, [completions, loaded]);

  // Refresh today's date when the app comes back to foreground
  useEffect(() => {
    const onFocus = () => setTodayISO(toISODate(new Date()));
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onFocus);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onFocus);
    };
  }, []);

  const toggleExercise = (date, exId) => {
    setCompletions(prev => {
      const day = prev[date] || [];
      const next = day.includes(exId) ? day.filter(x => x !== exId) : [...day, exId];
      return { ...prev, [date]: next };
    });
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <BrandHeader />
        {view === 'today' && (
          <TodayView
            todayISO={todayISO}
            completions={completions}
            onToggle={toggleExercise}
            onShowInfo={setInfoEx}
          />
        )}
        {view === 'calendar' && (
          <CalendarView
            todayISO={todayISO}
            completions={completions}
            onSelectDate={(iso) => { setTodayISO(iso); setView('today'); }}
          />
        )}
      </div>
      <BottomNav view={view} setView={setView} />
      {infoEx && <InfoModal ex={infoEx} onClose={() => setInfoEx(null)} />}
    </div>
  );
}

// ============================================================
// BRAND HEADER
// ============================================================
function BrandHeader() {
  return (
    <div style={styles.brandHeader}>
      <div style={styles.brandWordmark}>Comeback</div>
      <div style={styles.brandLogo}>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M11 18.5V4.5M5 10.5l6-6 6 6"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ============================================================
// TODAY VIEW
// ============================================================
function TodayView({ todayISO, completions, onToggle, onShowInfo }) {
  const workout = useMemo(() => workoutForDate(todayISO), [todayISO]);

  if (!workout) {
    return (
      <div style={styles.preStartCard}>
        <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
          See you May 18
        </div>
        <div style={{ marginTop: 12, color: 'var(--muted)' }}>
          Your protocol starts on the day of your PRP injection.
        </div>
      </div>
    );
  }

  const { dayN, phase, focus, exercises } = workout;
  const todayCompleted = completions[todayISO] || [];
  const allDone = exercises.length > 0 && exercises.every(e => todayCompleted.includes(e.id));
  const doneCount = todayCompleted.filter(id => exercises.find(e => e.id === id)).length;
  const progress = exercises.length === 0 ? 1 : doneCount / exercises.length;

  const dateObj = parseISODate(todayISO);
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
  const dateStr = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const weekN = Math.floor(dayN / 7) + 1;

  return (
    <div>
      <div style={styles.phaseChipRow}>
        <span style={{ ...styles.phaseChip, background: phase.color }}>
          {phase.name} · {phase.subtitle}
        </span>
      </div>

      <div style={styles.hero}>
        <div style={styles.heroLabel}>DAY</div>
        <div style={styles.heroNumber}>{dayN}</div>
        <div style={styles.heroSubtext}>
          <div style={{ fontWeight: 500 }}>{dayName}, {dateStr}</div>
          <div style={{ color: 'var(--muted)', marginTop: 2 }}>
            Week {weekN} of 12 · {focus}
          </div>
        </div>
      </div>

      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
      </div>
      <div style={styles.progressLabel}>
        {doneCount} of {exercises.length} done
        {allDone && exercises.length > 0 && (
          <span style={{ color: 'var(--accent)', fontWeight: 600, marginLeft: 8 }}>
            · Day complete
          </span>
        )}
      </div>

      {exercises.length === 0 && (
        <div style={styles.restCard}>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Rest Day
          </div>
          <div style={{ color: 'var(--muted)', marginTop: 8, lineHeight: 1.5 }}>
            Recovery is when the work pays off. Optional: gentle stretching, easy walk.
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        {exercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            ex={ex}
            done={todayCompleted.includes(ex.id)}
            onToggle={() => onToggle(todayISO, ex.id)}
            onInfo={() => onShowInfo(ex)}
          />
        ))}
      </div>

      {allDone && exercises.length > 0 && (
        <div style={styles.celebration}>
          <Trophy size={20} strokeWidth={1.5} />
          <span style={{ marginLeft: 10 }}>One step closer. Nice work.</span>
        </div>
      )}
    </div>
  );
}

// ============================================================
// EXERCISE CARD
// ============================================================
function ExerciseCard({ ex, done, onToggle, onInfo }) {
  return (
    <div
      style={{
        ...styles.exCard,
        ...(done ? styles.exCardDone : {}),
      }}
    >
      <button
        onClick={onToggle}
        style={{
          ...styles.checkbox,
          ...(done ? styles.checkboxDone : {}),
        }}
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done && <Check size={16} strokeWidth={3} color="white" />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 600,
          fontSize: 16,
          color: done ? 'var(--muted)' : 'var(--ink)',
          textDecoration: done ? 'line-through' : 'none',
          textDecorationColor: 'var(--muted)',
          letterSpacing: '-0.01em',
        }}>
          {ex.name}
        </div>
        <div style={{
          fontSize: 13,
          color: 'var(--muted)',
          marginTop: 4,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {ex.sets}
        </div>
      </div>
      <button onClick={onInfo} style={styles.infoBtn} aria-label="More info">
        <Info size={16} strokeWidth={1.5} />
      </button>
    </div>
  );
}

// ============================================================
// INFO MODAL
// ============================================================
function InfoModal({ ex, onClose }) {
  return (
    <div style={styles.modalBackdrop} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.modalClose} aria-label="Close">
          <X size={18} strokeWidth={1.5} />
        </button>
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          paddingRight: 28,
        }}>
          {ex.name}
        </div>
        <div style={{
          marginTop: 8,
          fontSize: 14,
          color: 'var(--muted)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {ex.sets}
        </div>
        <div style={{
          marginTop: 16,
          fontSize: 15,
          lineHeight: 1.55,
          color: 'var(--ink)',
        }}>
          {ex.note}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CALENDAR VIEW
// ============================================================
function CalendarView({ todayISO, completions, onSelectDate }) {
  const today = parseISODate(todayISO);
  const [viewMonth, setViewMonth] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const stats = useMemo(() => {
    const today = parseISODate(todayISO);
    let totalComplete = 0;
    let streak = 0;
    let totalActiveDays = 0;
    let cursor = new Date(today);
    let streakBroken = false;

    while (true) {
      const iso = toISODate(cursor);
      const dayN = dayNumberForDate(iso);
      if (dayN < 0) break;
      const workout = workoutForDate(iso);
      if (!workout) break;
      if (workout.exercises.length === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      totalActiveDays++;
      const completed = completions[iso] || [];
      const allDone = workout.exercises.every(e => completed.includes(e.id));
      if (allDone) {
        totalComplete++;
        if (!streakBroken) streak++;
      } else {
        if (iso !== todayISO) streakBroken = true;
      }
      cursor.setDate(cursor.getDate() - 1);
    }
    return { totalComplete, streak, totalActiveDays };
  }, [completions, todayISO]);

  const grid = useMemo(() => {
    const first = new Date(viewMonth.year, viewMonth.month, 1);
    const startDOW = first.getDay();
    const daysInMonth = new Date(viewMonth.year, viewMonth.month + 1, 0).getDate();
    const cells = [];
    for (let i = 0; i < startDOW; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewMonth.year, viewMonth.month, d);
      cells.push(toISODate(date));
    }
    return cells;
  }, [viewMonth]);

  const monthLabel = new Date(viewMonth.year, viewMonth.month, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const goPrev = () => setViewMonth(({ year, month }) => month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 });
  const goNext = () => setViewMonth(({ year, month }) => month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 });

  const todayDayN = dayNumberForDate(todayISO);
  const protocolProgress = Math.min(Math.max(todayDayN / TOTAL_DAYS, 0), 1);

  return (
    <div>
      <div style={styles.calHeader}>
        <div style={styles.calTitle}>The Journey</div>
        <div style={{ color: 'var(--muted)', marginTop: 4, fontSize: 14 }}>
          12-week protocol · started {parseISODate(PRP_DATE).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div style={styles.statsRow}>
        <StatBlock label="Streak" value={stats.streak} unit="days" icon={<Flame size={16} strokeWidth={1.5} />} />
        <StatBlock label="Complete" value={stats.totalComplete} unit={`of ${stats.totalActiveDays}`} />
        <StatBlock label="Day" value={Math.max(0, todayDayN)} unit={`of ${TOTAL_DAYS}`} />
      </div>

      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <div style={styles.progressTrack}>
          <div style={{ ...styles.progressFill, width: `${protocolProgress * 100}%`, background: 'var(--accent)' }} />
        </div>
      </div>

      <div style={styles.monthNav}>
        <button onClick={goPrev} style={styles.monthArrow}><ChevronLeft size={18} /></button>
        <div style={styles.monthLabel}>{monthLabel}</div>
        <button onClick={goNext} style={styles.monthArrow}><ChevronRight size={18} /></button>
      </div>

      <div style={styles.dowRow}>
        {['S','M','T','W','T','F','S'].map((d, i) => (
          <div key={i} style={styles.dowCell}>{d}</div>
        ))}
      </div>

      <div style={styles.calGrid}>
        {grid.map((iso, idx) => {
          if (!iso) return <div key={idx} />;
          const dayN = dayNumberForDate(iso);
          const date = parseISODate(iso);
          const isToday = iso === todayISO;
          const isFuture = iso > todayISO;
          const beforeProtocol = dayN < 0;
          const inProtocol = dayN >= 0 && dayN <= TOTAL_DAYS;

          const workout = beforeProtocol ? null : workoutForDate(iso);
          const isRest = workout && workout.exercises.length === 0;
          const completed = completions[iso] || [];
          const allDone = workout && workout.exercises.length > 0 && workout.exercises.every(e => completed.includes(e.id));
          const someDone = workout && completed.length > 0 && !allDone;

          let cellStyle = { ...styles.calCell };
          let textColor = 'var(--ink)';

          if (beforeProtocol) {
            textColor = 'var(--muted)';
            cellStyle = { ...cellStyle, opacity: 0.4 };
          } else if (isRest) {
            cellStyle = { ...cellStyle, background: 'var(--rule)' };
            textColor = 'var(--muted)';
          } else if (allDone) {
            cellStyle = { ...cellStyle, background: 'var(--accent)', color: 'white' };
            textColor = 'white';
          } else if (someDone) {
            cellStyle = { ...cellStyle, background: 'var(--accent-soft)' };
          } else if (isFuture) {
            textColor = 'var(--muted)';
          }

          if (isToday) {
            cellStyle = { ...cellStyle, boxShadow: 'inset 0 0 0 2px var(--ink)' };
          }

          return (
            <button
              key={idx}
              style={cellStyle}
              onClick={() => inProtocol && onSelectDate(iso)}
              disabled={beforeProtocol}
            >
              <span style={{ color: textColor, fontVariantNumeric: 'tabular-nums', fontWeight: isToday ? 700 : 500 }}>
                {date.getDate()}
              </span>
              {allDone && <Check size={11} strokeWidth={3} color="white" style={{ marginTop: 1 }} />}
            </button>
          );
        })}
      </div>

      <div style={styles.legend}>
        <LegendDot color="var(--accent)" label="Complete" />
        <LegendDot color="var(--accent-soft)" label="Partial" />
        <LegendDot color="var(--rule)" label="Rest" />
      </div>
    </div>
  );
}

function StatBlock({ label, value, unit, icon }) {
  return (
    <div style={styles.statBlock}>
      <div style={styles.statLabel}>
        {icon && <span style={{ marginRight: 6, opacity: 0.7 }}>{icon}</span>}
        {label}
      </div>
      <div style={styles.statValueRow}>
        <span style={styles.statValue}>{value}</span>
        <span style={styles.statUnit}>{unit}</span>
      </div>
    </div>
  );
}

function LegendDot({ color, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted)' }}>
      <div style={{ width: 12, height: 12, borderRadius: 3, background: color }} />
      <span>{label}</span>
    </div>
  );
}

// ============================================================
// BOTTOM NAV
// ============================================================
function BottomNav({ view, setView }) {
  return (
    <div style={styles.bottomNav}>
      <button
        onClick={() => setView('today')}
        style={{ ...styles.navBtn, ...(view === 'today' ? styles.navBtnActive : {}) }}
      >
        <Home size={20} strokeWidth={1.5} />
        <span style={styles.navLabel}>Today</span>
      </button>
      <button
        onClick={() => setView('calendar')}
        style={{ ...styles.navBtn, ...(view === 'calendar' ? styles.navBtnActive : {}) }}
      >
        <Calendar size={20} strokeWidth={1.5} />
        <span style={styles.navLabel}>Journey</span>
      </button>
    </div>
  );
}

// ============================================================
// STYLES
// ============================================================
const styles = {
  app: {
    fontFamily: '"DM Sans", -apple-system, system-ui, sans-serif',
    background: 'var(--bg)',
    color: 'var(--ink)',
    minHeight: '100vh',
    paddingBottom: 80,
    WebkitFontSmoothing: 'antialiased',
  },
  container: {
    maxWidth: 520,
    margin: '0 auto',
    padding: '20px 22px 24px',
  },

  brandHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  brandWordmark: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    color: 'var(--ink)',
  },
  brandLogo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'var(--accent)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  phaseChipRow: { marginBottom: 24 },
  phaseChip: {
    display: 'inline-block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'white',
    padding: '5px 11px',
    borderRadius: 999,
  },

  hero: { marginBottom: 28 },
  heroLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.18em',
    color: 'var(--muted)',
    marginBottom: 4,
  },
  heroNumber: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 104,
    fontWeight: 700,
    lineHeight: 0.9,
    letterSpacing: '-0.05em',
    color: 'var(--ink)',
  },
  heroSubtext: { marginTop: 12, fontSize: 15 },

  progressTrack: {
    width: '100%',
    height: 4,
    background: 'var(--rule)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'var(--ink)',
    transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  progressLabel: {
    marginTop: 8,
    fontSize: 13,
    color: 'var(--muted)',
    fontVariantNumeric: 'tabular-nums',
  },

  restCard: {
    marginTop: 24,
    padding: '28px 22px',
    background: 'var(--bg-card)',
    borderRadius: 12,
    border: '1px solid var(--rule)',
  },

  exCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 16px',
    background: 'var(--bg-card-hi)',
    borderRadius: 10,
    border: '1px solid var(--rule)',
    marginBottom: 8,
    transition: 'all 200ms ease',
  },
  exCardDone: {
    background: 'var(--bg-card)',
    borderColor: 'var(--accent-soft)',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 7,
    border: '1.5px solid var(--rule)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    background: 'transparent',
    transition: 'all 150ms ease',
  },
  checkboxDone: {
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
  },
  infoBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    flexShrink: 0,
  },

  celebration: {
    marginTop: 28,
    padding: '18px 20px',
    background: 'var(--accent-soft)',
    border: '1px solid var(--accent)',
    borderRadius: 10,
    color: 'var(--accent)',
    fontWeight: 600,
    fontSize: 15,
    display: 'flex',
    alignItems: 'center',
  },

  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(31, 30, 27, 0.5)',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 100,
    padding: 16,
  },
  modalCard: {
    background: 'var(--bg)',
    borderRadius: 16,
    padding: '24px 24px 28px',
    maxWidth: 480,
    width: '100%',
    position: 'relative',
    boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--muted)',
    borderRadius: 8,
  },

  calHeader: { marginBottom: 24 },
  calTitle: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 36,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
  },
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 8,
    marginBottom: 12,
  },
  statBlock: {
    background: 'var(--bg-card-hi)',
    border: '1px solid var(--rule)',
    borderRadius: 10,
    padding: '12px 14px',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 4,
  },
  statValueRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 26,
    fontWeight: 700,
    letterSpacing: '-0.02em',
    lineHeight: 1,
    fontVariantNumeric: 'tabular-nums',
  },
  statUnit: { fontSize: 11, color: 'var(--muted)' },
  monthNav: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  monthArrow: {
    width: 36,
    height: 36,
    borderRadius: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ink)',
  },
  monthLabel: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  dowRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 6,
    marginBottom: 6,
  },
  dowCell: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.1em',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    padding: '4px 0',
  },
  calGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: 6,
  },
  calCell: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    background: 'var(--bg-card-hi)',
    border: '1px solid var(--rule)',
    borderRadius: 8,
    padding: 0,
  },
  legend: {
    marginTop: 16,
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  preStartCard: {
    padding: '40px 24px',
    background: 'var(--bg-card)',
    borderRadius: 12,
    border: '1px solid var(--rule)',
    textAlign: 'center',
  },

  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(245, 241, 234, 0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderTop: '1px solid var(--rule)',
    display: 'flex',
    justifyContent: 'center',
    gap: 24,
    padding: '8px 16px',
    paddingBottom: 'max(8px, env(safe-area-inset-bottom))',
  },
  navBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
    padding: '8px 16px',
    color: 'var(--muted)',
    borderRadius: 8,
    transition: 'color 150ms ease',
  },
  navBtnActive: { color: 'var(--ink)' },
  navLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.06em',
  },
};
