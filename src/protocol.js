// ============================================================
// PERSONAL CONFIGURATION — edit these for your situation
// ============================================================
export const PRP_DATE = '2026-05-18'; // Your Day 0 (YYYY-MM-DD)
export const TOTAL_DAYS = 84;          // 12-week protocol length

// ============================================================
// EXERCISE LIBRARY
// Each exercise: { name, sets, note }
// dynamic: 'run' is replaced at runtime with the running workout
// for the current week of Phase III.
// ============================================================
export const EX = {
  // Phase I stretches
  supineHam:        { name: 'Supine Hamstring Stretch',          sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Loop strap around foot. Raise leg straight to mild stretch only.' },
  supineLatHam:     { name: 'Supine Lateral Hamstring',          sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Same setup, leg drifts outward to bias lateral hamstring.' },
  modPiriformis:    { name: 'Modified Piriformis Stretch',       sets: '2–3 × 30 sec / side',    cat: 'Mobility', note: 'Supine. Cross ankle over opposite knee, pull thigh in.' },
  seatedHam:        { name: 'Seated Hamstring Stretch',          sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Edge of chair. Heel down, hinge from hips.' },
  seatedPiri:       { name: 'Seated Piriformis Stretch',         sets: '2–3 × 30 sec / side',    cat: 'Mobility', note: 'Figure-4 sitting. Gentle lean forward.' },

  // Phase II stretches
  giraffe:          { name: 'Giraffe (Standing Hamstring)',      sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Foot on low platform. Flat back, hinge from hips.' },
  golfer:           { name: 'Golfer Stretch',                    sets: '2–3 × 30 sec / side',    cat: 'Mobility', note: 'Standing side bend. Opens lateral hip and trunk.' },
  thomas:           { name: 'Thomas Stretch',                    sets: '2–3 × 30 sec / side',    cat: 'Mobility', note: 'Edge of table. Hug one knee, let other dangle.' },
  gastroc:          { name: 'Gastroc Stretch',                   sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Staggered stance. Back knee straight, heel down.' },
  soleus:           { name: 'Standing Soleus Stretch',           sets: '2–3 × 30 sec / leg',     cat: 'Mobility', note: 'Same as gastroc, back knee bent. Stop if knee hurts.' },

  // Phase II activation
  clamshells:       { name: 'Clamshells',                        sets: '2–3 × 15 / side',        cat: 'Strength', note: 'Open top knee without rolling hips back.' },
  sideLyingAbd:     { name: 'Side-Lying Hip Abduction',          sets: '2–3 × 15 / side',        cat: 'Strength', note: 'Top leg straight, toes slightly down.' },
  sideHipSeries:    { name: 'Side Hip Series (1–3)',             sets: '2 × 10–15 each position',cat: 'Strength', note: '3-position side-lying progression.' },
  buttBurners:      { name: 'Butt Burners (1–3)',                sets: '2 × 10–15 / side',       cat: 'Strength', note: 'Quadruped hip extension. Squeeze glute, no low-back arch.' },
  slr:              { name: 'Straight Leg Raise',                sets: '3 × 15 / leg',           cat: 'Strength', note: 'Lock knee straight first, then lift ~12 inches.' },
  psoasMarch:       { name: 'Psoas March',                       sets: '2–3 × 10 / side',        cat: 'Strength', note: 'Light band resistance. Hip flexor endurance.' },

  // Phase II core
  taHeelTaps:       { name: 'TA with Heel Taps',                 sets: '2–3 × 10 / side',        cat: 'Strength', note: 'Tabletop position. Low back pinned to floor.' },
  deadBugRocks:     { name: 'Dead Bug Rocks',                    sets: '2–3 × 10 / side',        cat: 'Strength', note: 'Slow opposite arm/leg extension.' },
  plankRocks:       { name: 'Plank Rocks',                       sets: '2–3 × 10',               cat: 'Strength', note: 'Forearm plank, rock over elbows.' },
  plankKneeDrops:   { name: 'Plank with Knee Drops',             sets: '2–3 × 10 / side',        cat: 'Strength', note: 'Tap knee to floor, hips stay level.' },
  plankStepOut:     { name: 'Plank Step Out / In',               sets: '2–3 × 10 / side',        cat: 'Strength', note: 'High plank, step foot out wide and back.' },
  sitUpBall:        { name: 'Sit Ups with Ball Transfer',        sets: '2 × 10',                 cat: 'Strength', note: 'Pass ball between hands and feet.' },
  aroundWorld:      { name: 'Around the World',                  sets: '2 × 8–10 / direction',   cat: 'Strength', note: 'Circle KB around body. Anti-rotation core.' },

  // Phase II late strength
  wallSit:          { name: 'Wall Sit (isometric)',              sets: '2–3 × 20–30 sec',        cat: 'Strength', note: 'Shallow only (30–45°). Progress depth as pain allows.' },
  shortArcQuad:     { name: 'Short Arc Quads',                   sets: '3 × 15 / leg',           cat: 'Strength', note: 'Bolster under knee. Squeeze quad 2 sec at top.' },
  tkeBand:          { name: 'TKE with Resistance Band',          sets: '3 × 15 / leg',           cat: 'Strength', note: 'Band behind knee. Push knee back into full extension.' },
  hamCurlBand:      { name: 'Seated Hamstring Curl (band)',      sets: '3 × 15 / leg',           cat: 'Strength', note: 'Pull heel back against band.' },
  bridgeLegLift:    { name: 'Bridges with Leg Lift',             sets: '2–3 × 10–12 / side',     cat: 'Strength', note: 'Bridge, lift one leg. Hips stay level.' },
  bridgeHamCurl:    { name: 'Bridge with Hamstring Curl',        sets: '2–3 × 10–12',            cat: 'Strength', note: 'Heels on ball. Lift hips, roll ball in.' },
  stepUp:           { name: 'Step Up',                           sets: '2–3 × 10 / leg',         cat: 'Strength', note: '4–6 in box. Drive through heel. Slow down.' },
  singleLegReach:   { name: 'Single Leg Reach',                  sets: '2–3 × 8–10 / leg',       cat: 'Strength', note: 'Reach in different directions. Knee tracks over toes.' },

  // Bulletproof Phase II
  tibRaises:        { name: 'Tibialis Raises',                   sets: '3 × 15–20',              cat: 'Strength', note: 'Heels at wall. Lift toes to shins, slow lower.' },
  calfRaiseSingle:  { name: 'Single-Leg Calf Raise',             sets: '3 × 10–15 / leg',        cat: 'Strength', note: 'One leg on edge of step. Full ROM.' },
  kneeCARs:         { name: 'Knee CARs (controlled circles)',    sets: '5–10 each direction',    cat: 'Mobility', note: 'Slow knee circles. Joint mobility.' },
  foamRollLatQuad:  { name: 'Foam Roll Lateral Quad / TFL',      sets: '2–3 min / leg',          cat: 'Mobility', note: 'Hip to just above knee. Side-lying.' },

  // Phase III
  latStepDown:      { name: 'Lateral Step Downs',                sets: '2 × 15 / leg',           cat: 'Strength', note: '3–5 sec lowering. Knee tracks straight.' },
  bosuLunge:        { name: 'BOSU Lunge',                        sets: '2–3 × 10 / leg',         cat: 'Strength', note: 'Front foot on BOSU. Reverse lunge.' },
  spanishSquat:     { name: 'Spanish Squat',                     sets: '2–3 × 10–15',            cat: 'Strength', note: 'Heavy band behind knees. Sit back with vertical shins.' },
  petersonStep:     { name: 'Peterson Step-Up',                  sets: '2 × 10–15 / leg',        cat: 'Strength', note: '4–6 in step. Heel up. Slow bend, tap off-heel forward.' },
  slantSquat:       { name: 'Slant Board Squat',                 sets: '2–3 × 10–15',            cat: 'Strength', note: 'Heels elevated 25–30°. Bodyweight squat.' },
  bulgarianSplit:   { name: 'Bulgarian Split Squat',             sets: '2–3 × 8–10 / leg',       cat: 'Strength', note: 'Rear foot on bench. Upright torso.' },
  singleLegHinge:   { name: 'Single-Leg Hinge',                  sets: '2–3 × 8 / leg',          cat: 'Strength', note: 'Hinge forward, extend back leg.' },

  // Running (workout details replaced at runtime)
  runDay:           { name: 'Easy Run',                          sets: '—',                      cat: 'Cardio',   note: 'See running progression for this week.', dynamic: 'run' },

  // Cardio
  easyBike:         { name: 'Easy Cardio (bike/pool)',           sets: '15–30 min easy',         cat: 'Cardio',   note: 'No knee loading. Conversational effort.' },
  longCardio:       { name: 'Longer Cardio Session',             sets: '30–45 min easy',         cat: 'Cardio',   note: 'Bike or pool jog. Build aerobic base.' },
  crossTrain:       { name: 'Cross-Training Cardio',             sets: '30 min',                 cat: 'Cardio',   note: 'Bike, elliptical, or pool. Non-impact.' },
};

// ============================================================
// PHASES & WEEKLY SCHEDULES
// daily: exercises every day in this phase
// weekly: keyed by day-of-week (0=Sun..6=Sat)
// ============================================================
export const PHASES = [
  {
    id: 'p1',
    name: 'Phase I',
    subtitle: 'Lay Low',
    description: 'Tissue protection',
    startDay: 0,
    endDay: 7,
    color: '#6B665D',
    daily: ['supineHam', 'supineLatHam', 'modPiriformis', 'seatedHam', 'seatedPiri'],
    weekly: null,
  },
  {
    id: 'p2early',
    name: 'Phase II',
    subtitle: 'Wake It Up',
    description: 'Early tissue healing',
    startDay: 8,
    endDay: 14,
    color: '#3D5A3D',
    daily: ['supineHam', 'modPiriformis', 'giraffe', 'gastroc', 'soleus'],
    weekly: {
      1: { focus: 'Mobility + Core',  ex: ['taHeelTaps', 'deadBugRocks', 'plankRocks', 'plankKneeDrops', 'sitUpBall'] },
      2: { focus: 'Easy Cardio',      ex: ['easyBike'] },
      3: { focus: 'Glute + Quad',     ex: ['clamshells', 'sideLyingAbd', 'sideHipSeries', 'buttBurners', 'slr'] },
      4: { focus: 'Easy Cardio',      ex: ['easyBike'] },
      5: { focus: 'Mobility + Core',  ex: ['taHeelTaps', 'plankStepOut', 'aroundWorld', 'psoasMarch'] },
      6: { focus: 'Active Recovery',  ex: [] },
      0: { focus: 'Rest',             ex: [] },
    },
  },
  {
    id: 'p2late',
    name: 'Phase II',
    subtitle: 'Build the Base',
    description: 'Progressive loading',
    startDay: 15,
    endDay: 42,
    color: '#2D4A2B',
    daily: ['supineHam', 'giraffe', 'gastroc', 'kneeCARs', 'tibRaises'],
    weekly: {
      1: { focus: 'Strength A',       ex: ['wallSit', 'shortArcQuad', 'tkeBand', 'stepUp', 'bridgeLegLift', 'calfRaiseSingle'] },
      2: { focus: 'Cardio + Core',    ex: ['crossTrain', 'taHeelTaps', 'plankKneeDrops', 'singleLegReach'] },
      3: { focus: 'Strength B',       ex: ['slr', 'hamCurlBand', 'bridgeHamCurl', 'clamshells', 'sideHipSeries', 'foamRollLatQuad'] },
      4: { focus: 'Cardio',           ex: ['crossTrain'] },
      5: { focus: 'Strength A',       ex: ['wallSit', 'shortArcQuad', 'tkeBand', 'stepUp', 'bridgeLegLift', 'calfRaiseSingle'] },
      6: { focus: 'Long Cardio',      ex: ['longCardio', 'foamRollLatQuad'] },
      0: { focus: 'Rest / Mobility',  ex: ['foamRollLatQuad'] },
    },
  },
  {
    id: 'p3',
    name: 'Phase III',
    subtitle: 'Get Strong, Get Running',
    description: 'Eccentrics + return to running',
    startDay: 43,
    endDay: 84,
    color: '#B5573A',
    daily: ['supineHam', 'giraffe', 'gastroc', 'kneeCARs'],
    weekly: {
      1: { focus: 'Full Strength',        ex: ['spanishSquat', 'petersonStep', 'bulgarianSplit', 'calfRaiseSingle', 'tibRaises'] },
      2: { focus: 'Run Day 1',            ex: ['runDay', 'foamRollLatQuad'] },
      3: { focus: 'Cross-train + Core',   ex: ['crossTrain', 'plankRocks', 'plankStepOut', 'sideHipSeries'] },
      4: { focus: 'Run Day 2',            ex: ['runDay'] },
      5: { focus: 'Eccentric Focus',      ex: ['latStepDown', 'slantSquat', 'bosuLunge', 'singleLegHinge', 'tibRaises'] },
      6: { focus: 'Run Day 3',            ex: ['runDay'] },
      0: { focus: 'Rest + Mobility',      ex: ['foamRollLatQuad'] },
    },
  },
  {
    id: 'maint',
    name: 'Maintenance',
    subtitle: 'Bulletproof for Life',
    description: 'Long-term knee health',
    startDay: 85,
    endDay: 9999,
    color: '#C6A363',
    daily: ['supineHam', 'gastroc', 'kneeCARs'],
    weekly: {
      1: { focus: 'Strength A',       ex: ['spanishSquat', 'bulgarianSplit', 'calfRaiseSingle'] },
      2: { focus: 'Easy Run',         ex: ['runDay'] },
      3: { focus: 'Cross-train',      ex: ['crossTrain', 'kneeCARs'] },
      4: { focus: 'Run + Strides',    ex: ['runDay'] },
      5: { focus: 'Strength B',       ex: ['latStepDown', 'singleLegHinge', 'calfRaiseSingle'] },
      6: { focus: 'Long Run',         ex: ['runDay'] },
      0: { focus: 'Rest',             ex: [] },
    },
  },
];

// Running workouts mapped by protocol-day range
export const RUN_WORKOUTS = [
  { fromDay: 43, toDay: 55,   label: '1 min jog / 2 min walk × 8',           surface: 'Treadmill' },
  { fromDay: 56, toDay: 62,   label: '2 min jog / 1 min walk × 8',           surface: 'Treadmill' },
  { fromDay: 63, toDay: 69,   label: '3 min jog / 1 min walk × 6',           surface: 'Treadmill or flat outdoor' },
  { fromDay: 70, toDay: 76,   label: '5 min jog / 1 min walk × 4',           surface: 'Outdoor flat' },
  { fromDay: 77, toDay: 83,   label: 'Continuous easy 15–20 min',            surface: 'Outdoor flat' },
  { fromDay: 84, toDay: 9999, label: 'Continuous easy 20–30 min + strides',  surface: 'Vary' },
];

// ============================================================
// HELPERS
// ============================================================
export function parseISODate(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}
export function toISODate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
export function daysBetween(a, b) {
  const ms = parseISODate(b) - parseISODate(a);
  return Math.round(ms / 86400000);
}
export function dayNumberForDate(iso) {
  return daysBetween(PRP_DATE, iso);
}
export function phaseForDay(dayN) {
  if (dayN < 0) return null;
  return PHASES.find(p => dayN >= p.startDay && dayN <= p.endDay) || PHASES[PHASES.length - 1];
}
export function runWorkoutForDay(dayN) {
  return RUN_WORKOUTS.find(w => dayN >= w.fromDay && dayN <= w.toDay);
}
export function workoutForDate(iso) {
  const dayN = dayNumberForDate(iso);
  const phase = phaseForDay(dayN);
  if (!phase) return null;

  const dow = parseISODate(iso).getDay();
  const sessionInfo = phase.weekly ? phase.weekly[dow] : null;
  const focus = sessionInfo ? sessionInfo.focus : 'Daily Routine';
  const sessionEx = sessionInfo ? sessionInfo.ex : [];

  const allIds = [...phase.daily, ...sessionEx];

  const exercises = allIds.map((id, idx) => {
    const base = EX[id];
    if (!base) return null;
    let ex = { id: `${id}_${idx}`, exId: id, ...base };
    if (base.dynamic === 'run') {
      const run = runWorkoutForDay(dayN);
      if (run) {
        ex = { ...ex, sets: run.label, note: `Surface: ${run.surface}. Easy conversational pace. Stop if pain >3/10.` };
      }
    }
    return ex;
  }).filter(Boolean);

  return { dayN, phase, dow, focus, exercises };
}
