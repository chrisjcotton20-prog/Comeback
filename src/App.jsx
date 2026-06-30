import React, { useState, useEffect, useMemo } from 'react';
import {
  Check, Calendar, Home, ChevronLeft, ChevronRight,
  Flame, Trophy, Clock, Zap, Layers
} from 'lucide-react';
import {
  PRP_DATE,
  TOTAL_DAYS,
  PHASE_LABELS,
  DOSE_DOTS,
  parseISODate,
  toISODate,
  dayNumberForDate,
  workoutForDate,
  resolveBlockItems,
  fullModeItems,
  floorModeItems,
} from './protocol.js';

// ============================================================
// CATEGORY ORDER & CONFIG
// ============================================================
const STORAGE_KEY = 'comeback_v2_completions';
const RETRO_KEY   = 'comeback_v2_retrospectives';

// ============================================================
// STORAGE — localStorage with async wrapper for portability
// ============================================================
const storage = {
  async get(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  },
  async set(key, value) {
    try { localStorage.setItem(key, value); } catch {}
  },
};

// ============================================================
// APP
// ============================================================
export default function App() {
  const [view, setView] = useState('today');
  const [todayISO, setTodayISO] = useState(toISODate(new Date()));
  const [completions, setCompletions] = useState({});
  const [retros, setRetros] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      const c = await storage.get(STORAGE_KEY);
      if (c) { try { setCompletions(JSON.parse(c)); } catch {} }
      const r = await storage.get(RETRO_KEY);
      if (r) { try { setRetros(JSON.parse(r)); } catch {} }
      setLoaded(true);
    })();
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded) return;
    storage.set(STORAGE_KEY, JSON.stringify(completions));
  }, [completions, loaded]);

  useEffect(() => {
    if (!loaded) return;
    storage.set(RETRO_KEY, JSON.stringify(retros));
  }, [retros, loaded]);

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

  const updateRetro = (date, field, value) => {
    setRetros(prev => ({ ...prev, [date]: { ...(prev[date] || {}), [field]: value } }));
  };

  return (
    <div style={styles.app}>
      <div style={styles.container}>
        <BrandHeader />
        {view === 'today' && (
          <TodayView
            todayISO={todayISO}
            completions={completions}
            retros={retros}
            onToggle={toggleExercise}
            onRetroChange={updateRetro}
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
function TodayView({ todayISO, completions, retros, onToggle, onRetroChange }) {
  const [mode, setMode] = useState('full');
  const wo = useMemo(() => workoutForDate(todayISO), [todayISO]);

  if (!wo) return <PreStart />;
  const { dayN, phase, day } = wo;

  const items = mode === 'full' ? fullModeItems(day, phase.id) : floorModeItems(day);
  const doneIds = completions[todayISO] || [];
  const doneCount = items.filter(i => doneIds.includes(i.id)).length;
  const total = items.length;
  const progress = total === 0 ? 0 : doneCount / total;
  const allDone = total > 0 && doneCount === total;

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
          <div style={{ fontWeight: 600, fontSize: 16 }}>{dayName}, {dateStr}</div>
          <div style={{ color: 'var(--muted)', marginTop: 2, fontSize: 14 }}>
            Week {weekN} of 12 · {day.focus}
          </div>
          {day.why && (
            <div style={{ color: 'var(--muted)', marginTop: 8, fontSize: 13, lineHeight: 1.4, fontStyle: 'italic' }}>
              {day.why}
            </div>
          )}
        </div>
      </div>

      <TrackDoses doses={day.doses} />
      <ModeToggle mode={mode} setMode={setMode} fullMin={day.fullMin} floorMin={day.floorMin} />

      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
      </div>
      <div style={styles.progressLabel}>
        {doneCount} of {total} done
        {allDone && total > 0 && (
          <span style={{ color: 'var(--accent)', fontWeight: 700, marginLeft: 8 }}>· Day complete</span>
        )}
      </div>

      {mode === 'full' ? (
        <FullSession
          day={day}
          phaseId={phase.id}
          todayISO={todayISO}
          doneIds={doneIds}
          onToggle={onToggle}
          retros={retros}
          onRetroChange={onRetroChange}
        />
      ) : (
        <FloorSession items={items} todayISO={todayISO} doneIds={doneIds} onToggle={onToggle} />
      )}

      {day.targets && day.targets.length > 0 && <TargetsBox targets={day.targets} />}

      {allDone && total > 0 && (
        <div style={styles.celebration}>
          <Trophy size={18} strokeWidth={1.5} />
          <span style={{ marginLeft: 10 }}>Day complete. Keep going.</span>
        </div>
      )}
    </div>
  );
}

function PreStart() {
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

// ============================================================
// TRACK DOSES
// ============================================================
function TrackDoses({ doses }) {
  const tracks = [
    { key: 'A', label: 'Ankle/Foot' },
    { key: 'B', label: 'Lumbar/Hip' },
    { key: 'C', label: 'T-spine' },
  ];
  return (
    <div style={styles.dosesRow}>
      {tracks.map(t => {
        const level = doses[t.key];
        const dots = DOSE_DOTS[level] || 1;
        return (
          <div key={t.key} style={styles.dosePill}>
            <span style={styles.doseKey}>{t.key}</span>
            <span style={styles.doseLabel}>{t.label}</span>
            <span style={styles.doseDots}>
              {[1, 2, 3].map(n => (
                <span key={n} style={{
                  ...styles.doseDot,
                  background: n <= dots ? 'var(--ink)' : 'var(--rule)',
                }} />
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// MODE TOGGLE
// ============================================================
function ModeToggle({ mode, setMode, fullMin, floorMin }) {
  return (
    <div style={styles.toggleRow}>
      <button
        onClick={() => setMode('full')}
        style={{ ...styles.toggleBtn, ...(mode === 'full' ? styles.toggleBtnActive : {}) }}
      >
        <span style={styles.toggleBtnLabel}>Full Session</span>
        <span style={styles.toggleBtnTime}>~{fullMin} min</span>
      </button>
      <button
        onClick={() => setMode('floor')}
        style={{ ...styles.toggleBtn, ...(mode === 'floor' ? styles.toggleBtnActive : {}) }}
      >
        <span style={styles.toggleBtnLabel}>Floor</span>
        <span style={styles.toggleBtnTime}>~{floorMin} min</span>
      </button>
    </div>
  );
}

// ============================================================
// FULL SESSION
// ============================================================
function FullSession({ day, phaseId, todayISO, doneIds, onToggle, retros, onRetroChange }) {
  return (
    <div style={{ marginTop: 24 }}>
      {day.blocks.map((block, bi) => {
        if (block.isRetrospective) {
          return (
            <RetrospectiveBlock
              key={bi}
              block={block}
              todayISO={todayISO}
              retros={retros}
              onRetroChange={onRetroChange}
            />
          );
        }
        return (
          <BlockSection
            key={bi}
            block={block}
            blockIndex={bi}
            phaseId={phaseId}
            todayISO={todayISO}
            doneIds={doneIds}
            onToggle={onToggle}
            isFlowWave={!!day.isFlow && block.isFlowWave}
          />
        );
      })}
    </div>
  );
}

// ============================================================
// BLOCK SECTION
// ============================================================
function BlockSection({ block, blockIndex, phaseId, todayISO, doneIds, onToggle, isFlowWave }) {
  const items = resolveBlockItems(block, phaseId);
  if (items.length === 0) return null;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={styles.blockHeader}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
          <span style={styles.blockName}>{block.name}</span>
          <span style={styles.blockMeta}>
            <Clock size={11} strokeWidth={2} style={{ marginRight: 3, verticalAlign: '-1px' }} />
            {block.duration} min
          </span>
          {block.phaseGated && <span style={styles.blockPhaseTag}>{PHASE_LABELS[phaseId]}</span>}
          {block.optional && <span style={styles.blockOptionalTag}>Optional</span>}
        </div>
        {block.emphasis && <div style={styles.blockEmphasis}>{block.emphasis}</div>}
        {isFlowWave && block.waveBodyPos && <div style={styles.blockEmphasis}>{block.waveBodyPos}</div>}
      </div>
      {items.map((it, ii) => {
        const id = `b${blockIndex}_${ii}`;
        const done = doneIds.includes(id);
        return (
          <ItemRow
            key={id}
            name={it.name}
            detail={it.detail}
            done={done}
            onToggle={() => onToggle(todayISO, id)}
          />
        );
      })}
    </div>
  );
}

// ============================================================
// FLOOR SESSION
// ============================================================
function FloorSession({ items, todayISO, doneIds, onToggle }) {
  return (
    <div style={{ marginTop: 24, marginBottom: 28 }}>
      <div style={styles.blockHeader}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={styles.blockName}>Today's Minimum</span>
          <span style={styles.blockMeta}>
            <Zap size={11} strokeWidth={2} style={{ marginRight: 3, verticalAlign: '-1px' }} />
            Floor
          </span>
        </div>
        <div style={styles.blockEmphasis}>Bad-day non-negotiables. Hit these and the day counts.</div>
      </div>
      {items.map(it => {
        const done = doneIds.includes(it.id);
        return (
          <ItemRow
            key={it.id}
            name={it.name}
            detail={it.detail}
            done={done}
            onToggle={() => onToggle(todayISO, it.id)}
          />
        );
      })}
    </div>
  );
}

// ============================================================
// ITEM ROW
// ============================================================
function ItemRow({ name, detail, done, onToggle }) {
  return (
    <div style={{ ...styles.itemRow, ...(done ? styles.itemRowDone : {}) }}>
      <button
        onClick={onToggle}
        style={{ ...styles.checkbox, ...(done ? styles.checkboxDone : {}) }}
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done && <Check size={14} strokeWidth={3} color="white" />}
      </button>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 600,
          fontSize: 15,
          color: done ? 'var(--muted)' : 'var(--ink)',
          textDecoration: done ? 'line-through' : 'none',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>
          {name}
        </div>
        {detail && (
          <div style={{
            fontSize: 13,
            color: 'var(--muted)',
            marginTop: 3,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.35,
          }}>
            {detail}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// RETROSPECTIVE
// ============================================================
function RetrospectiveBlock({ block, todayISO, retros, onRetroChange }) {
  const data = retros[todayISO] || {};
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={styles.blockHeader}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={styles.blockName}>{block.name}</span>
          <span style={styles.blockMeta}>
            <Clock size={11} strokeWidth={2} style={{ marginRight: 3, verticalAlign: '-1px' }} />
            {block.duration} min
          </span>
        </div>
        <div style={styles.blockEmphasis}>One sentence each. Trends matter more than single days.</div>
      </div>
      <div style={styles.retroBox}>
        {block.prompts.map(prompt => (
          <RetroField
            key={prompt.id}
            prompt={prompt}
            value={data[prompt.id] || ''}
            onChange={(v) => onRetroChange(todayISO, prompt.id, v)}
          />
        ))}
      </div>
    </div>
  );
}

function RetroField({ prompt, value, onChange }) {
  if (prompt.type === 'score') {
    return (
      <div style={styles.retroField}>
        <label style={styles.retroLabel}>{prompt.label}</label>
        <div style={styles.scoreRow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <button
              key={n}
              onClick={() => onChange(String(n))}
              style={{
                ...styles.scoreChip,
                ...(value === String(n) ? styles.scoreChipActive : {}),
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div style={styles.retroField}>
      <label style={styles.retroLabel}>{prompt.label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type here…"
        rows={2}
        style={styles.retroInput}
      />
    </div>
  );
}

// ============================================================
// TARGETS
// ============================================================
function TargetsBox({ targets }) {
  return (
    <div style={styles.targetsBox}>
      <div style={styles.targetsHeader}>
        <Layers size={13} strokeWidth={2} style={{ marginRight: 6, verticalAlign: '-1px' }} />
        TARGETS
      </div>
      <ul style={styles.targetsList}>
        {targets.map((t, i) => (
          <li key={i} style={styles.targetItem}>{t}</li>
        ))}
      </ul>
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
    let totalComplete = 0, streak = 0, totalActiveDays = 0;
    let cursor = new Date(today);
    let streakBroken = false;

    while (true) {
      const iso = toISODate(cursor);
      const dayN = dayNumberForDate(iso);
      if (dayN < 0) break;
      const wo = workoutForDate(iso);
      if (!wo) break;

      const items = fullModeItems(wo.day, wo.phase.id);
      if (items.length === 0) {
        cursor.setDate(cursor.getDate() - 1);
        continue;
      }
      totalActiveDays++;
      const doneIds = completions[iso] || [];
      const floor = floorModeItems(wo.day);
      const fullDone = items.every(it => doneIds.includes(it.id));
      const floorDone = floor.length > 0 && floor.every(it => doneIds.includes(it.id));
      const dayComplete = fullDone || floorDone;
      if (dayComplete) {
        totalComplete++;
        if (!streakBroken) streak++;
      } else {
        if (iso !== todayISO) streakBroken = true;
      }
      cursor.setDate(cursor.getDate() - 1);
      if (totalActiveDays > 365) break;
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
  const goPrev = () => setViewMonth(({ year, month }) =>
    month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 });
  const goNext = () => setViewMonth(({ year, month }) =>
    month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 });

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
        <StatBlock label="Streak" value={stats.streak} unit="days" icon={<Flame size={14} strokeWidth={1.5} />} />
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
          const beforeProtocol = dayN < 0;
          const inProtocol = dayN >= 0 && dayN <= TOTAL_DAYS;

          const wo = beforeProtocol ? null : workoutForDate(iso);
          let allDone = false, someDone = false;
          if (wo) {
            const items = fullModeItems(wo.day, wo.phase.id);
            const floor = floorModeItems(wo.day);
            const doneIds = completions[iso] || [];
            if (items.length > 0) {
              const fullDone = items.every(it => doneIds.includes(it.id));
              const floorDone = floor.length > 0 && floor.every(it => doneIds.includes(it.id));
              allDone = fullDone || floorDone;
              someDone = !allDone && doneIds.length > 0;
            }
          }

          let cellStyle = { ...styles.calCell };
          let textColor = 'var(--ink)';

          if (beforeProtocol) {
            textColor = 'var(--muted)';
            cellStyle = { ...cellStyle, opacity: 0.4 };
          } else if (allDone) {
            cellStyle = { ...cellStyle, background: 'var(--accent)' };
            textColor = 'white';
          } else if (someDone) {
            cellStyle = { ...cellStyle, background: 'var(--accent-soft)' };
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
    minHeight: '100vh',
    paddingBottom: 80,
  },
  container: { maxWidth: 560, margin: '0 auto', padding: '20px 22px 24px' },

  brandHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 },
  brandWordmark: { fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--ink)' },
  brandLogo: { width: 36, height: 36, borderRadius: 10, background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' },

  phaseChipRow: { marginBottom: 20 },
  phaseChip: { display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white', padding: '5px 11px', borderRadius: 999 },

  hero: { marginBottom: 20 },
  heroLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', color: 'var(--muted)', marginBottom: 4 },
  heroNumber: { fontFamily: 'Montserrat, sans-serif', fontSize: 96, fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.05em', color: 'var(--ink)' },
  heroSubtext: { marginTop: 14 },

  dosesRow: { display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' },
  dosePill: { display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: 'var(--bg-card-hi)', border: '1px solid var(--rule)', borderRadius: 8, flex: 1, minWidth: 0 },
  doseKey: { fontFamily: 'Montserrat, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--accent)' },
  doseLabel: { fontSize: 11, color: 'var(--muted)', fontWeight: 600, letterSpacing: '0.04em', flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  doseDots: { display: 'flex', gap: 3 },
  doseDot: { width: 6, height: 6, borderRadius: '50%' },

  toggleRow: { display: 'flex', gap: 6, marginBottom: 14, padding: 4, background: 'var(--bg-card)', borderRadius: 10, border: '1px solid var(--rule)' },
  toggleBtn: { flex: 1, padding: '10px 14px', borderRadius: 7, display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', transition: 'all 150ms ease' },
  toggleBtnActive: { background: 'var(--ink)', color: 'white' },
  toggleBtnLabel: { fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' },
  toggleBtnTime: { fontSize: 11, opacity: 0.7, fontVariantNumeric: 'tabular-nums' },

  progressTrack: { width: '100%', height: 4, background: 'var(--rule)', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', background: 'var(--ink)', transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1)' },
  progressLabel: { marginTop: 8, fontSize: 12, color: 'var(--muted)', fontVariantNumeric: 'tabular-nums', fontWeight: 600 },

  blockHeader: { marginBottom: 12, paddingBottom: 10, borderBottom: '1px solid var(--rule)' },
  blockName: { fontFamily: 'Montserrat, sans-serif', fontSize: 14, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--ink)' },
  blockMeta: { fontSize: 11, fontWeight: 600, color: 'var(--muted)', letterSpacing: '0.04em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', fontVariantNumeric: 'tabular-nums' },
  blockPhaseTag: { display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 7px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 4 },
  blockOptionalTag: { display: 'inline-block', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '2px 7px', background: 'var(--bg-card)', color: 'var(--muted)', borderRadius: 4, border: '1px solid var(--rule)' },
  blockEmphasis: { fontSize: 12, color: 'var(--muted)', marginTop: 4, fontStyle: 'italic' },

  itemRow: { display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', background: 'var(--bg-card-hi)', borderRadius: 8, border: '1px solid var(--rule)', marginBottom: 6, transition: 'all 200ms ease' },
  itemRowDone: { background: 'var(--bg-card)', borderColor: 'var(--accent-soft)' },
  checkbox: { width: 24, height: 24, borderRadius: 6, border: '1.5px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'transparent', marginTop: 2, transition: 'all 150ms ease' },
  checkboxDone: { background: 'var(--accent)', borderColor: 'var(--accent)' },

  retroBox: { padding: 18, background: 'var(--bg-card-hi)', border: '1px solid var(--rule)', borderRadius: 10 },
  retroField: { marginBottom: 16 },
  retroLabel: { display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink)', marginBottom: 6, lineHeight: 1.4 },
  retroInput: { width: '100%', padding: 10, fontSize: 14, border: '1px solid var(--rule)', borderRadius: 6, background: 'var(--bg)', color: 'var(--ink)', outline: 'none', fontFamily: 'inherit' },
  scoreRow: { display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 4 },
  scoreChip: { padding: '6px 0', fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', background: 'var(--bg)', border: '1px solid var(--rule)', borderRadius: 4, color: 'var(--muted)', transition: 'all 100ms ease' },
  scoreChipActive: { background: 'var(--accent)', color: 'white', borderColor: 'var(--accent)' },

  targetsBox: { marginTop: 24, padding: 18, background: 'var(--bg-card)', border: '1px solid var(--rule)', borderRadius: 10 },
  targetsHeader: { fontFamily: 'Montserrat, sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: 'var(--accent)', marginBottom: 10, display: 'flex', alignItems: 'center' },
  targetsList: { margin: 0, padding: 0, listStyle: 'none' },
  targetItem: { fontSize: 14, lineHeight: 1.4, color: 'var(--ink)', paddingLeft: 18, marginBottom: 6, position: 'relative' },

  celebration: { marginTop: 24, padding: '14px 18px', background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 10, color: 'var(--accent)', fontWeight: 700, fontSize: 14, display: 'flex', alignItems: 'center' },

  preStartCard: { padding: '40px 24px', background: 'var(--bg-card)', borderRadius: 12, border: '1px solid var(--rule)', textAlign: 'center' },

  calHeader: { marginBottom: 24 },
  calTitle: { fontFamily: 'Montserrat, sans-serif', fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 },
  statBlock: { background: 'var(--bg-card-hi)', border: '1px solid var(--rule)', borderRadius: 10, padding: '12px 14px' },
  statLabel: { fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', marginBottom: 4 },
  statValueRow: { display: 'flex', alignItems: 'baseline', gap: 4 },
  statValue: { fontFamily: 'Montserrat, sans-serif', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, fontVariantNumeric: 'tabular-nums' },
  statUnit: { fontSize: 11, color: 'var(--muted)' },
  monthNav: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  monthArrow: { width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink)' },
  monthLabel: { fontFamily: 'Montserrat, sans-serif', fontSize: 18, fontWeight: 600, letterSpacing: '-0.01em' },
  dowRow: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6, marginBottom: 6 },
  dowCell: { textAlign: 'center', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', padding: '4px 0' },
  calGrid: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 6 },
  calCell: { aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 14, background: 'var(--bg-card-hi)', border: '1px solid var(--rule)', borderRadius: 8, padding: 0 },
  legend: { marginTop: 16, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' },

  bottomNav: { position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(245, 241, 234, 0.94)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderTop: '1px solid var(--rule)', display: 'flex', justifyContent: 'center', gap: 24, padding: '8px 16px', paddingBottom: 'max(8px, env(safe-area-inset-bottom))' },
  navBtn: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '8px 16px', color: 'var(--muted)', borderRadius: 8, transition: 'color 150ms ease' },
  navBtnActive: { color: 'var(--ink)' },
  navLabel: { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' },
};
