// ============================================================
// PERSONAL CONFIGURATION — edit for your situation
// ============================================================
export const PRP_DATE = '2026-05-18'; // Day 0
export const TOTAL_DAYS = 84;          // 12-week protocol

// ============================================================
// PHASES (gating + display)
// ============================================================
export const PHASES = [
  { id: 'p1',      name: 'Phase I',     subtitle: 'Lay Low',                 startDay: 0,  endDay: 7,    color: '#6B665D' },
  { id: 'p2early', name: 'Phase II',    subtitle: 'Wake It Up',              startDay: 8,  endDay: 14,   color: '#3D5A3D' },
  { id: 'p2late',  name: 'Phase II',    subtitle: 'Build the Base',          startDay: 15, endDay: 42,   color: '#2D4A2B' },
  { id: 'p3',      name: 'Phase III',   subtitle: 'Get Strong, Get Running', startDay: 43, endDay: 84,   color: '#B5573A' },
  { id: 'maint',   name: 'Maintenance', subtitle: 'Bulletproof for Life',    startDay: 85, endDay: 9999, color: '#C6A363' },
];

export const PHASE_LABELS = {
  p1: 'Phase I',
  p2early: 'Phase II Early',
  p2late: 'Phase II Late',
  p3: 'Phase III',
  maint: 'Maintenance',
};

export const DOSE_DOTS = { light: 1, brief: 1, moderate: 2, heavy: 3 };

// ============================================================
// RUNNING PROGRESSION — Phase III walk-jog → continuous
// Run days: Tue/Thu/Sat (3×/week) in Phase III; 3–4×/week in Maintenance
// ============================================================
export const RUN_PROGRESSION = [
  { startDay: 43, endDay: 56, workout: '1 min jog / 2 min walk × 8',  durMin: 24, surface: 'Treadmill',                  label: 'Phase III · Wk 1–2' },
  { startDay: 57, endDay: 63, workout: '2 min jog / 1 min walk × 8',  durMin: 24, surface: 'Treadmill',                  label: 'Phase III · Wk 3' },
  { startDay: 64, endDay: 70, workout: '3 min jog / 1 min walk × 6',  durMin: 24, surface: 'Treadmill or flat outdoor',  label: 'Phase III · Wk 4' },
  { startDay: 71, endDay: 77, workout: '5 min jog / 1 min walk × 4',  durMin: 24, surface: 'Outdoor flat',                label: 'Phase III · Wk 5' },
  { startDay: 78, endDay: 84, workout: 'Continuous easy 15–20 min',   durMin: 18, surface: 'Outdoor flat',                label: 'Phase III · Wk 6' },
  { startDay: 85, endDay: 9999, workout: 'Continuous easy 20–30 min + strides 4 × 20 sec', durMin: 28, surface: 'Vary', label: 'Maintenance' },
];

// Pain rules apply to every run
export const RUN_PAIN_RULES = [
  'Stop the run if knee pain rises above 3/10. Try again next session.',
  'If knee is more sore or swollen the morning after, repeat the previous week.',
];

// ============================================================
// BENCHMARK MARKERS — measured on Sunday, trended over time
// Weekly: quick (30 sec). Monthly: longer test (2 min).
// Knee pain trend comes from the existing Sunday retro `knee` score.
// ============================================================
export const BENCHMARK_MARKERS = {
  weekly: [
    { id: 'kneeToWall_L', label: 'Knee-to-wall · L',  short: 'K→W L', unit: 'cm', min: 0, max: 15, step: 0.5, target: 10 },
    { id: 'kneeToWall_R', label: 'Knee-to-wall · R',  short: 'K→W R', unit: 'cm', min: 0, max: 15, step: 0.5, target: 10 },
  ],
  monthly: [
    { id: 'calfRaise_L', label: 'Single-leg calf raise · L',  short: 'Calf L',    unit: 'reps', min: 0, max: 50, step: 1, target: 25 },
    { id: 'calfRaise_R', label: 'Single-leg calf raise · R',  short: 'Calf R',    unit: 'reps', min: 0, max: 50, step: 1, target: 25 },
    { id: 'balance_L',   label: 'SL balance eyes closed · L', short: 'Balance L', unit: 'sec',  min: 0, max: 60, step: 1, target: 30 },
    { id: 'balance_R',   label: 'SL balance eyes closed · R', short: 'Balance R', unit: 'sec',  min: 0, max: 60, step: 1, target: 30 },
  ],
};

// ============================================================
// V2 PROGRAM — weekly schedule (0=Sun, 1=Mon...6=Sat)
//
// Each day has:
//   focus      — primary focus
//   why        — one-line technical reason
//   doses      — { A, B, C } intensity per track
//   fullMin    — full session ceiling minutes
//   floorMin   — floor session floor minutes
//   blocks     — Prepare → Open → Load → Integrate → Finisher
//                (Saturday uses Aerobic + flow waves; Sunday adds Retrospective)
//   floor      — bad-day non-negotiables
//   targets    — concrete benchmarks
//
// Block types:
//   { name, duration, items?, byPhase?, phaseGated?, emphasis?,
//     optional?, isFlowWave?, waveBodyPos?, isRetrospective?, prompts? }
//
// Item: { name, detail }
// ============================================================
export const DAYS = {
  1: { // MONDAY
    focus: 'Hip Complex + Posterior Chain',
    why: 'Hip hinge = foundation pattern. Without it, lumbar takes hip motion and knee takes squat compression.',
    doses: { A: 'brief', B: 'heavy', C: 'brief' },
    fullMin: 60, floorMin: 20,
    blocks: [
      { name: 'Prepare', duration: 10, items: [
        { name: '90/90 breathing', detail: '5 breaths each side' },
        { name: 'Hip CARs', detail: '2 reps each direction, each side' },
        { name: 'Knee CARs', detail: '5 each direction, each side' },
        { name: 'Ankle CARs', detail: '5 each direction, each side · (A)' },
        { name: 'Tibialis raises', detail: '1×15' },
        { name: 'Short foot exercise', detail: '2×30 sec/foot · (A)' },
      ]},
      { name: 'Activate', duration: 5, emphasis: 'Glute med + hip abductor', items: [
        { name: 'Banded clamshells', detail: '2×15/side' },
        { name: 'Side-lying hip abduction', detail: '2×12/side' },
        { name: 'Monster walks', detail: '2×10 steps each direction' },
      ]},
      { name: 'Open', duration: 15, emphasis: 'Track B', items: [
        { name: '90/90 transitions', detail: '8 reps slow' },
        { name: 'Hip airplane', detail: '3 each side' },
        { name: 'Cossack squat flow', detail: '8 reps unloaded' },
        { name: 'Pigeon w/ active reaches', detail: '5 each side + 60-sec hold' },
      ]},
      { name: 'PAILs/RAILs — 90/90 Hip', duration: 5, emphasis: 'End-range strength', showInPhases: ['p3', 'maint'], items: [
        { name: '90/90 hip PAIL/RAIL', detail: '2 min hold → 10-sec PAIL → 10-sec RAIL, 2 rounds/side' },
      ]},
      { name: 'Load', duration: 20, emphasis: 'Hinge progression', phaseGated: true, byPhase: {
        p2early: [
          { name: 'Bird dog', detail: '3×8/side' },
          { name: 'Banded glute bridge', detail: '3×12' },
          { name: 'Dead bug', detail: '3×8/side' },
        ],
        p2late: [
          { name: 'RDL practice (BW)', detail: '3×10' },
          { name: 'Single-leg glute bridge', detail: '3×10/side' },
          { name: 'Banded pull-through', detail: '3×12' },
        ],
        p3: [
          { name: 'Loaded RDL (KB/DB)', detail: '3×8' },
          { name: 'Single-leg RDL', detail: '3×8/side' },
          { name: 'Banded good morning', detail: '3×12' },
        ],
        maint: [
          { name: 'Heavy KB swing', detail: '5×10' },
          { name: 'Loaded single-leg RDL', detail: '3×8/side' },
          { name: 'Sliding leg curl', detail: '3×8' },
        ],
      }},
      { name: 'Integrate', duration: 5, emphasis: 'Track C', items: [
        { name: 'Peanut on t-spine', detail: '3 segments × 60 sec each, active arm reaches' },
        { name: 'Open book rotations', detail: '5 each side' },
      ]},
      { name: 'Finisher', duration: 5, optional: true, items: [
        { name: 'Couch stretch', detail: '90 sec each side' },
        { name: 'Dead hang', detail: '30 sec (when equipped)' },
      ]},
    ],
    floor: [
      { name: '90/90 breathing', detail: '3 min' },
      { name: 'Hip CARs', detail: '2 min total' },
      { name: 'Tibialis raises', detail: '1×15' },
      { name: 'Main loaded hinge (current phase)', detail: '1 set' },
      { name: 'Bird dog', detail: '1×8/side' },
      { name: 'Peanut t-spine', detail: '2 min' },
    ],
    targets: [
      'Hip hinge with neutral lumbar through full ROM',
      'Glute-dominant posterior chain firing pattern',
      'Single-leg RDL: 8 reps with steady balance, no twist',
    ],
  },

  2: { // TUESDAY
    focus: 'Ankle/Foot + Single-Leg Strength',
    why: 'Most adults: 20–30° dorsiflexion. Running: 35–40° needed. Knee absorbs the gap. This day closes it.',
    doses: { A: 'heavy', B: 'brief', C: 'brief' },
    fullMin: 55, floorMin: 20,
    blocks: [
      { name: 'Prepare', duration: 10, items: [
        { name: 'Lacrosse ball under arch', detail: '2 min/side' },
        { name: 'Tennis ball on calf (knee bent → straight)', detail: '2 min/side' },
        { name: 'Ankle CARs', detail: '5 each direction/side' },
        { name: 'Knee CARs', detail: '5 each direction/side' },
        { name: 'Toe spreads / yoga toes', detail: '60 sec' },
        { name: 'Short foot exercise', detail: '2×30 sec/foot' },
      ]},
      { name: 'Open', duration: 15, emphasis: 'Track A', items: [
        { name: 'Banded ankle distraction', detail: '10 deep pulses/side × 2' },
        { name: 'Deep squat hold w/ elbow wedge', detail: '60 sec × 2' },
        { name: 'Wall-banded dorsiflexion', detail: '10/side' },
        { name: 'Calf stretch split stance', detail: '60 sec gastroc + 60 sec soleus/side' },
      ]},
      { name: 'PAILs/RAILs — Ankle DF', duration: 5, emphasis: 'End-range strength', showInPhases: ['p3', 'maint'], items: [
        { name: 'Ankle DF PAIL/RAIL', detail: '2 min end-range hold → 10-sec PAIL → 10-sec RAIL, 2 rounds/side' },
      ]},
      { name: 'Run', duration: 25, isRun: true, runProgressionFor: ['p3', 'maint'], emphasis: 'Scheduled run day' },
      { name: 'Load', duration: 20, runDayDuration: 10, emphasis: 'Single-leg strength', phaseGated: true,
        byPhase: {
          p2early: [
            { name: 'Wall-supported single-leg balance', detail: '3×30 sec/side' },
            { name: 'Double-leg calf raise', detail: '3×15' },
            { name: 'Tibialis raise', detail: '3×15' },
            { name: 'Concentric step-up to low box', detail: '3×10/side' },
          ],
          p2late: [
            { name: 'Single-leg balance + head turns', detail: '3×30 sec/side' },
            { name: 'Single-leg calf raise', detail: '3×12/side' },
            { name: 'Tibialis raise', detail: '3×20' },
            { name: 'Step-up controlled down', detail: '3×10/side' },
            { name: 'Banded TKE single-leg', detail: '3×12/side' },
          ],
          p3: [
            { name: 'KOT slant-board squat', detail: '3×12' },
            { name: 'ATG split squat (assisted)', detail: '3×8/side' },
            { name: 'Single-leg calf raise w/ 3-sec eccentric', detail: '3×12/side' },
            { name: 'Lateral step-down', detail: '3×12/side' },
          ],
          maint: [
            { name: 'Loaded ATG split squat', detail: '3×8/side' },
            { name: 'Loaded single-leg calf raise', detail: '3×12/side' },
            { name: 'Tibialis raise w/ band', detail: '3×20' },
            { name: 'Pistol progression', detail: '3×5/side' },
          ],
        },
        runDayByPhase: {
          p3: [
            { name: 'KOT slant-board squat', detail: '2×10' },
            { name: 'Lateral step-down', detail: '2×10/side' },
            { name: 'Single-leg calf raise w/ 3-sec eccentric', detail: '2×12/side' },
          ],
          maint: [
            { name: 'Loaded ATG split squat', detail: '2×8/side' },
            { name: 'Loaded single-leg calf raise', detail: '2×12/side' },
            { name: 'Tibialis raise w/ band', detail: '2×20' },
          ],
        },
      },
      { name: 'Integrate', duration: 5, emphasis: 'Track B', items: [
        { name: '90/90 breathing', detail: '5 breaths each side' },
        { name: 'Couch stretch', detail: '90 sec each side' },
      ]},
      { name: 'Finisher', duration: 10, optional: true, items: [
        { name: 'Backward walk', detail: '5 min brisk · drive through VMO · (A/KOT)' },
        { name: 'Peanut t-spine', detail: '2 min · (C)' },
        { name: 'Open books', detail: '5 each side' },
      ]},
    ],
    floor: [
      { name: 'Lacrosse ball foot + calf', detail: '4 min total' },
      { name: 'Ankle CARs both sides', detail: '2 min' },
      { name: 'Banded ankle distraction', detail: '10 pulses/side' },
      { name: 'Main single-leg exercise (current phase)', detail: '1 set' },
      { name: 'Tibialis raises', detail: '1×15' },
      { name: '90/90 breathing', detail: '2 min' },
    ],
    targets: [
      'Squat to depth, heels flat, arms overhead',
      'Walk down stairs heel-first, no knee tightness',
      'Single-leg calf raise: 15 reps full ROM, no cramp',
      'Banded ankle distraction at end range feels accessible',
    ],
  },

  3: { // WEDNESDAY
    focus: 'T-spine + Core + Loaded Carries',
    why: 'Locked t-spine forces lumbar to provide rotation it isn\'t built for. Loaded carries brace the trunk under realistic asymmetric load.',
    doses: { A: 'brief', B: 'moderate', C: 'heavy' },
    fullMin: 55, floorMin: 20,
    blocks: [
      { name: 'Prepare', duration: 10, items: [
        { name: 'Foam roll t-spine standard', detail: '2 min' },
        { name: 'Peanut on individual segments', detail: '4–5 min, breathe in each position' },
        { name: 'Wall slides', detail: '2×10' },
        { name: 'Cat/cow segmental', detail: '2 min' },
      ]},
      { name: 'Open', duration: 15, emphasis: 'Track C', items: [
        { name: 'Open book rotations', detail: '8/side × 2' },
        { name: 'Quadruped t-spine rotation w/ reach', detail: '8/side × 2' },
        { name: 'Thread the needle hold', detail: '30 sec/side × 2' },
        { name: 'Half-kneeling thoracic rotation w/ reach', detail: '8/side' },
        { name: 'Side-lying windmill', detail: '8/side' },
      ]},
      { name: 'Load', duration: 20, emphasis: 'Core under load', phaseGated: true, byPhase: {
        p2early: [
          { name: 'Bird dog', detail: '3×10/side' },
          { name: 'Dead bug', detail: '3×8/side' },
          { name: 'Side plank', detail: '3×20 sec/side' },
          { name: 'Suitcase carry (loaded backpack)', detail: '3×30 sec/side' },
        ],
        p2late: [
          { name: 'Pallof press', detail: '3×10 each direction' },
          { name: 'Bird dog row w/ band', detail: '3×8/side' },
          { name: 'Side plank reach-through', detail: '3×8/side' },
          { name: 'Heavier suitcase carry', detail: '3×40 sec/side' },
          { name: 'Banded standing knee raise', detail: '3×10/side · hip flexor endurance' },
          { name: 'Hollow body hold', detail: '3×20–30 sec' },
        ],
        p3: [
          { name: 'Pallof press + rotation', detail: '3×10/side' },
          { name: 'Bird dog row', detail: '3×10/side' },
          { name: 'Copenhagen plank', detail: '3×15 sec/side' },
          { name: 'Heavy suitcase carry', detail: '3×40 sec/side' },
          { name: 'Banded standing knee raise', detail: '3×10/side · hip flexor endurance' },
          { name: 'Farmer\'s carry', detail: '3×30 sec' },
        ],
        maint: [
          { name: 'Heavy farmer\'s carry', detail: '3×40 sec' },
          { name: 'Overhead carry', detail: '3×30 sec/side' },
          { name: 'Pallof + rotation', detail: '3×10/side' },
          { name: 'Weighted standing knee raise', detail: '3×10/side · hip flexor power' },
          { name: 'Dragon flag negatives', detail: '3×5' },
        ],
      }},
      { name: 'Integrate', duration: 5, emphasis: 'Tracks A + B', items: [
        { name: 'Ankle CARs', detail: 'both sides' },
        { name: '90/90 breathing', detail: '5 breaths each side' },
        { name: 'Couch stretch', detail: '60 sec each side' },
      ]},
      { name: 'Finisher', duration: 5, optional: true, items: [
        { name: 'Dead hang', detail: '30 sec (when equipped)' },
        { name: 'Lacrosse ball on pec', detail: '60 sec each side' },
      ]},
    ],
    floor: [
      { name: 'Peanut t-spine', detail: '5 min · critical' },
      { name: 'Open books', detail: '5 each side' },
      { name: 'Pallof press or bird dog', detail: '1 set' },
      { name: 'Suitcase carry', detail: '1 round each side' },
      { name: 'Ankle CARs', detail: '1 min' },
      { name: '90/90 breathing', detail: '2 min' },
    ],
    targets: [
      'T-spine rotation 45° each direction, hips square',
      'Open book: top hand touches floor behind',
      'Peanut work registers as deep relief, not pain',
      'Suitcase carry 40 sec/side with no lateral lean',
    ],
  },

  4: { // THURSDAY
    focus: 'Shoulders + Upper Push/Pull',
    why: 'Tight shoulders and tight t-spine reinforce each other. Upper-body strength stabilizes the trunk during running\'s swing phase.',
    doses: { A: 'brief', B: 'brief', C: 'moderate' },
    fullMin: 55, floorMin: 20,
    blocks: [
      { name: 'Prepare', duration: 10, items: [
        { name: 'Lacrosse ball on pec', detail: '90 sec/side' },
        { name: 'Lacrosse ball on upper trap', detail: '60 sec/side' },
        { name: 'Shoulder CARs', detail: '2 each direction/side' },
        { name: 'Banded shoulder dislocates', detail: '2×10' },
        { name: 'Wall slides', detail: '2×10' },
      ]},
      { name: 'Open', duration: 15, items: [
        { name: 'Banded lat stretch', detail: '60 sec/side' },
        { name: 'Banded posterior capsule stretch', detail: '60 sec/side' },
        { name: 'Prone Y-T-W-L', detail: '5/position × 2' },
        { name: 'Hanging (or banded assist)', detail: '2×30 sec · when equipped' },
        { name: 'Wall-supported handstand hold', detail: '10–30 sec × 2 · optional' },
      ]},
      { name: 'Run', duration: 25, isRun: true, runProgressionFor: ['p3', 'maint'], emphasis: 'Scheduled run day' },
      { name: 'Load', duration: 20, runDayDuration: 10, emphasis: 'Push/pull balance', phaseGated: true,
        byPhase: {
          p2early: [
            { name: 'Banded row', detail: '3×12' },
            { name: 'Pushup (knee or full)', detail: '3×8–12' },
            { name: 'Banded shoulder press', detail: '3×10' },
            { name: 'Banded face pull', detail: '3×15' },
            { name: 'Scap pull', detail: '3×10' },
          ],
          p2late: [
            { name: 'Banded pull-apart', detail: '3×15' },
            { name: 'Pushup w/ shoulder tap', detail: '3×6/side' },
            { name: 'Banded overhead press', detail: '3×10' },
            { name: 'Banded W raise', detail: '3×12' },
            { name: 'Hollow body hold', detail: '3×20 sec' },
          ],
          p3: [
            { name: 'Pull-up (assisted or full)', detail: '3×AMRAP' },
            { name: 'Decline or archer pushup', detail: '3×8' },
            { name: 'Banded or KB shoulder press', detail: '3×10' },
            { name: 'KB row', detail: '3×8/side' },
            { name: 'Banded int/ext rotation', detail: '3×12' },
          ],
          maint: [
            { name: 'Pull-up', detail: '3×AMRAP' },
            { name: 'Pike pushup / HSPU progression', detail: '3×6' },
            { name: 'KB press', detail: '3×8/side' },
            { name: 'KB row', detail: '3×8/side' },
            { name: 'Reverse fly', detail: '3×12' },
          ],
        },
        runDayByPhase: {
          p3: [
            { name: 'Pull-up (assisted or full)', detail: '2×AMRAP' },
            { name: 'Decline or archer pushup', detail: '2×8' },
            { name: 'KB row', detail: '2×8/side' },
          ],
          maint: [
            { name: 'Pull-up', detail: '2×AMRAP' },
            { name: 'KB press', detail: '2×8/side' },
            { name: 'KB row', detail: '2×8/side' },
          ],
        },
      },
      { name: 'Integrate', duration: 5, emphasis: 'Tracks C + B', items: [
        { name: 'Open book rotations', detail: '5 each side' },
        { name: 'Cat/cow', detail: '60 sec' },
        { name: '90/90 breathing', detail: '5 breaths each side' },
      ]},
      { name: 'Finisher', duration: 5, optional: true, items: [
        { name: 'Dead hang', detail: '30 sec' },
        { name: 'Foam roll lats', detail: '60 sec/side' },
        { name: 'Banded chest stretch', detail: '60 sec/side' },
      ]},
    ],
    floor: [
      { name: 'Lacrosse ball pec', detail: '3 min' },
      { name: 'Shoulder CARs', detail: '2 min' },
      { name: 'Banded dislocates', detail: '10' },
      { name: 'Main row (current phase)', detail: '1 set' },
      { name: 'Main push (current phase)', detail: '1 set' },
      { name: 'Wall slides', detail: '10' },
      { name: 'Open books', detail: '5 each side' },
    ],
    targets: [
      'Shoulder packed and stable at rest (no forward shrug)',
      'Push/pull balance (rows volume ≥ pushup volume)',
      'Pull-up: at least 1 unassisted (long-term)',
      'Dead hang: 60 sec relaxed',
    ],
  },

  5: { // FRIDAY
    focus: 'Lower-Body Compound',
    why: 'Main lower-body strength day. Knee-friendly compound variations (KOT progression). Where running power gets rebuilt.',
    doses: { A: 'moderate', B: 'moderate', C: 'brief' },
    fullMin: 60, floorMin: 20,
    blocks: [
      { name: 'Prepare', duration: 10, items: [
        { name: 'Foam roll quads', detail: '2 min' },
        { name: 'Foam roll glutes', detail: '90 sec/side' },
        { name: 'Foam roll calves', detail: '90 sec/side' },
        { name: 'Hip CARs', detail: '2 each direction/side · (B)' },
        { name: 'Knee CARs', detail: '5 each direction' },
        { name: 'Ankle CARs + tibialis raises', detail: '2 min · (A)' },
        { name: 'Short foot exercise', detail: '2×30 sec/foot · (A)' },
      ]},
      { name: 'Activate', duration: 5, emphasis: 'Glute med + hip abductor', items: [
        { name: 'Banded clamshells', detail: '2×15/side' },
        { name: 'Side-lying hip abduction', detail: '2×12/side' },
        { name: 'Monster walks', detail: '2×10 steps each direction' },
      ]},
      { name: 'Open', duration: 10, items: [
        { name: 'Cossack squat flow', detail: '8 reps' },
        { name: 'Deep squat hold w/ elbow wedge', detail: '60 sec' },
        { name: '90/90 transitions', detail: '5/side' },
        { name: 'Hip airplane', detail: '3/side' },
      ]},
      { name: 'Load', duration: 25, emphasis: 'Main strength block', phaseGated: true, byPhase: {
        p2early: [
          { name: 'Bodyweight squat', detail: '3×10' },
          { name: 'Glute bridge variation', detail: '3×12' },
          { name: 'Step-up', detail: '3×10/side' },
          { name: 'Banded TKE', detail: '3×12/side' },
          { name: 'Calf raise', detail: '3×15' },
        ],
        p2late: [
          { name: 'Goblet squat (KB if equipped)', detail: '3×10' },
          { name: 'Reverse lunge concentric focus', detail: '3×8/side' },
          { name: 'RDL practice', detail: '3×10' },
          { name: 'Banded TKE', detail: '3×12/side' },
          { name: 'Wall sit', detail: '3×30–45 sec' },
          { name: 'Calf raise', detail: '3×15' },
        ],
        p3: [
          { name: 'KOT slant-board squat', detail: '3×10' },
          { name: 'ATG split squat', detail: '3×8/side' },
          { name: 'Loaded RDL', detail: '3×8' },
          { name: 'Lateral step-down', detail: '3×12/side' },
          { name: 'Sissy squat (mobility version)', detail: '3×8' },
        ],
        maint: [
          { name: 'Heavy goblet/loaded squat', detail: '3×6–8' },
          { name: 'Loaded Bulgarian split squat', detail: '3×8/side' },
          { name: 'KB swing', detail: '5×10' },
          { name: 'Heavy RDL', detail: '3×6' },
          { name: 'Pistol progression', detail: '3×5/side' },
          { name: 'Pogo hops', detail: '3×20' },
        ],
      }},
      { name: 'Integrate', duration: 5, emphasis: 'Track C', items: [
        { name: 'Peanut t-spine', detail: '2 min' },
        { name: 'Open books', detail: '5 each side' },
        { name: 'Couch stretch', detail: '60 sec each side' },
      ]},
      { name: 'Finisher', duration: 5, optional: true, phaseGated: true, byPhase: {
        p2early: [
          { name: 'Dead hang', detail: '30 sec' },
          { name: 'Tibialis wall hold isometric', detail: '30 sec × 2' },
        ],
        p2late: [
          { name: 'Dead hang', detail: '30 sec' },
          { name: 'Tibialis wall hold isometric', detail: '30 sec × 2' },
        ],
        p3: [
          { name: 'Dead hang', detail: '30 sec' },
          { name: 'Pogo hops', detail: '2×15 · start light, build to 3×20' },
          { name: 'Tibialis wall hold isometric', detail: '30 sec × 2' },
        ],
        maint: [
          { name: 'Pogo hops', detail: '3×20' },
          { name: 'Dead hang', detail: '60 sec' },
          { name: 'Tibialis wall hold isometric', detail: '30 sec × 2' },
        ],
      }},
    ],
    floor: [
      { name: 'Foam roll quads + glutes', detail: '3 min' },
      { name: 'Hip CARs', detail: '2 min' },
      { name: 'Main squat (current phase)', detail: '1 set' },
      { name: 'Main hinge (current phase)', detail: '1 set' },
      { name: 'Single-leg work', detail: '1 set' },
      { name: 'Calf raise', detail: '1 set' },
      { name: '90/90 breathing', detail: '2 min' },
    ],
    targets: [
      'ATG split squat 8 reps full range each side',
      'KOT slant-board squat to bench, controlled',
      'Goblet squat 3×10 with KB weight progression',
      'Single-leg balance under load, no knee cave',
    ],
  },

  6: { // SATURDAY
    focus: 'Long Aerobic + Full-Body Flow',
    why: 'Longest available window. Phase-gated cardio + chained mobility flow.',
    doses: { A: 'moderate', B: 'moderate', C: 'moderate' },
    fullMin: 60, floorMin: 30,
    isFlow: true,
    blocks: [
      { name: 'Cardio', duration: 40, emphasis: 'Phase-gated', phaseGated: true, isRun: true, runProgressionFor: ['p3', 'maint'], byPhase: {
        p2early: [{ name: 'Bike / elliptical / pool walk', detail: '30–45 min easy conversational' }],
        p2late:  [{ name: 'Bike or pool jog', detail: '30–45 min steady' }],
      }},
      { name: 'Settling', duration: 4, waveBodyPos: 'Supine', isFlowWave: true, items: [
        { name: '90/90 breathing', detail: '5 breaths/side · (B)' },
        { name: 'Knees-to-chest, side-to-side rock', detail: '30 sec' },
        { name: 'Supine spinal twist', detail: '30 sec/side' },
      ]},
      { name: 'Rolling Out', duration: 5, waveBodyPos: 'Side-lying → seated', isFlowWave: true, items: [
        { name: 'Side-lying windmill', detail: '8/side · (C)' },
        { name: 'Open book rotations', detail: '8/side · (C)' },
        { name: 'Sit up: 90/90 transitions', detail: '5/side · (B)' },
        { name: 'Pigeon w/ active reaches', detail: '5 reaches + 60 sec hold/side · (B)' },
      ]},
      { name: 'Onto the Belly', duration: 5, waveBodyPos: 'Prone → quadruped', isFlowWave: true, items: [
        { name: 'Cobra', detail: '3 slow lifts, 5-sec final hold' },
        { name: 'Child\'s pose w/ side reaches', detail: '30 sec/side' },
        { name: 'Cat/cow segmental', detail: '5 cycles' },
        { name: 'Quadruped t-spine rotation w/ reach', detail: '8/side · (C)' },
        { name: 'Thread the needle hold', detail: '30 sec/side' },
      ]},
      { name: 'Rising Through Lunges', duration: 8, waveBodyPos: 'Quadruped → standing', isFlowWave: true, items: [
        { name: 'Down dog → plank → cobra → down dog', detail: '3 cycles' },
        { name: 'Walk hands to feet: forward fold hang', detail: '30 sec' },
        { name: 'Step right back to low lunge — sequence', detail: 'World\'s greatest stretch ×3 → t-spine rotation ×8 → couch stretch 60s · (B) → ankle distraction 10 · (A)' },
        { name: 'Switch sides: repeat full sequence on left', detail: 'Same as right' },
        { name: 'Walk feet to hands → roll up to standing', detail: '' },
      ]},
      { name: 'Standing Dynamic', duration: 4, waveBodyPos: 'Standing', isFlowWave: true, items: [
        { name: 'Forward fold → halfway lift → fold', detail: '3 cycles' },
        { name: 'Cossack squat flow', detail: '8 reps total, slow' },
        { name: 'Standing hip CARs', detail: '2 each direction/leg' },
        { name: 'Hip airplane', detail: '3/side' },
        { name: 'Dead hang', detail: '30 sec · when equipped · optional' },
      ]},
      { name: 'Cooling Down', duration: 4, waveBodyPos: 'Seated → supine', isFlowWave: true, items: [
        { name: 'Lacrosse ball foot massage', detail: '90 sec/side · (A)' },
        { name: 'Peanut t-spine', detail: '3 min, target segments · (C)' },
        { name: 'Final 90/90 breathing', detail: '5 breaths/side · (B)' },
      ]},
    ],
    floor: [
      { name: 'Easy cardio (phase-appropriate)', detail: '20 min' },
      { name: 'Joint CARs sweep', detail: '3 min · ankle, knee, hip, t-spine, shoulder' },
      { name: '90/90 breathing supine', detail: '3 breaths/side' },
      { name: 'Cat/cow segmental', detail: '5 cycles' },
      { name: 'Lunge: World\'s greatest + couch stretch', detail: '30 sec/side' },
      { name: 'Peanut t-spine', detail: '2 min' },
      { name: 'Final 90/90 breathing', detail: '3 breaths/side' },
    ],
    targets: [
      'Long aerobic capacity (build to 45 min steady-state)',
      'Continuous flow completion in 25 min, no breaks',
      'Phase III: running progression on schedule',
    ],
  },

  0: { // SUNDAY
    focus: 'Soft Tissue + Retrospective',
    why: 'Recovery day. Hard Sundays undermine the week\'s adaptation. Light, deliberate, journaled.',
    doses: { A: 'light', B: 'light', C: 'light' },
    fullMin: 35, floorMin: 15,
    blocks: [
      { name: 'Soft Tissue', duration: 18, items: [
        { name: 'Lacrosse ball: feet', detail: '60 sec/side' },
        { name: 'Lacrosse ball: calves', detail: '60 sec/side' },
        { name: 'Lacrosse ball: glutes', detail: '60 sec/side' },
        { name: 'Peanut: t-spine', detail: '3 min' },
        { name: 'Lacrosse ball: pecs', detail: '60 sec/side' },
        { name: 'Lacrosse ball: lats', detail: '60 sec/side' },
        { name: 'Foam roll: quads', detail: '90 sec' },
        { name: 'Foam roll: IT-band area', detail: '90 sec/side' },
        { name: 'Foam roll: t-spine', detail: '2 min' },
      ]},
      { name: 'Gentle Mobility', duration: 17, items: [
        { name: 'Slow CARs: ankle, knee, hip, t-spine, shoulder', detail: '2 min each, both sides' },
        { name: 'Pigeon', detail: '60 sec/side, no aggression' },
        { name: 'Child\'s pose', detail: '60 sec' },
        { name: 'Couch stretch', detail: '60 sec/side' },
        { name: '90/90 breathing', detail: '5 min, eyes closed' },
        { name: 'Easy walk outside', detail: '20–30 min (separate, not counted)' },
      ]},
      { name: 'Retrospective', duration: 5, isRetrospective: true, prompts: [
        { id: 'best',     label: 'Best moment this week (training or otherwise)',         type: 'text' },
        { id: 'hardest',  label: 'Hardest moment',                                         type: 'text' },
        { id: 'ankle',    label: 'Ankle 1–10',         type: 'score' },
        { id: 'lowback',  label: 'Low back 1–10',      type: 'score' },
        { id: 'tspine',   label: 'T-spine 1–10',       type: 'score' },
        { id: 'knee',     label: 'Knee 1–10',          type: 'score' },
        { id: 'ignoring', label: 'What\'s your body telling you that you\'ve been ignoring?', type: 'text' },
        { id: 'adjust',   label: 'One thing to adjust next week',                         type: 'text' },
      ]},
      { name: 'Benchmarks', duration: 3, isBenchmarks: true, emphasis: 'Objective progress markers · higher = better' },
    ],
    floor: [
      { name: 'Foam roll major muscle groups', detail: '10 min' },
      { name: 'Easy walk', detail: '20 min outside (separate)' },
      { name: 'Body check journal entry', detail: 'See retrospective' },
    ],
    targets: [
      'Weekly trend data on the four body-check scores',
      'Consistent Sunday retrospective entries',
    ],
  },
};

// Phase I substitution — V2 doesn't apply yet
export const PHASE_I_DAY = {
  focus: 'Tissue Protection',
  why: 'V2 begins Phase II Early (May 26). Until then: gentle supine stretches only. No weight training.',
  doses: { A: 'light', B: 'light', C: 'light' },
  fullMin: 15, floorMin: 10,
  blocks: [
    { name: 'Gentle Stretches', duration: 15, items: [
      { name: 'Supine hamstring stretch w/ strap', detail: '2–3 × 30 sec/leg' },
      { name: 'Supine lateral hamstring', detail: '2–3 × 30 sec/leg' },
      { name: 'Modified piriformis stretch', detail: '2–3 × 30 sec/side' },
      { name: 'Seated hamstring stretch', detail: '2–3 × 30 sec/leg' },
      { name: 'Seated piriformis stretch', detail: '2–3 × 30 sec/side' },
    ]},
  ],
  floor: [
    { name: 'Supine hamstring stretch', detail: '2 × 30 sec/leg' },
    { name: 'Modified piriformis stretch', detail: '2 × 30 sec/side' },
    { name: 'Seated piriformis stretch', detail: '2 × 30 sec/side' },
  ],
  targets: [
    'Protocol compliance: no NSAIDs, no ice, no weight training',
    'Tylenol-only for pain',
  ],
};

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
  return Math.round((parseISODate(b) - parseISODate(a)) / 86400000);
}

export function dayNumberForDate(iso) {
  return daysBetween(PRP_DATE, iso);
}

export function isFirstSundayOfMonth(iso) {
  const d = parseISODate(iso);
  return d.getDay() === 0 && d.getDate() <= 7;
}

export function phaseForDay(dayN) {
  if (dayN < 0) return null;
  return PHASES.find(p => dayN >= p.startDay && dayN <= p.endDay) || PHASES[PHASES.length - 1];
}

export function workoutForDate(iso) {
  const dayN = dayNumberForDate(iso);
  const phase = phaseForDay(dayN);
  if (!phase) return null;
  const dow = parseISODate(iso).getDay();
  const day = phase.id === 'p1' ? PHASE_I_DAY : DAYS[dow];
  return { dayN, phase, dow, day };
}

export function runForDate(iso) {
  const dayN = dayNumberForDate(iso);
  if (dayN < 0) return null;
  return RUN_PROGRESSION.find(r => dayN >= r.startDay && dayN <= r.endDay) || null;
}

// True if any block in this day is an active run block for the given phase
export function isRunDayForPhase(day, phaseId) {
  return day.blocks.some(b =>
    b.isRun && b.runProgressionFor && b.runProgressionFor.includes(phaseId)
  );
}

export function resolveBlockItems(block, phaseId, iso, dayContext = {}) {
  const { isRunDay: dayIsRun } = dayContext;

  // Block-level phase gating (e.g. PAILs/RAILs mini-blocks show only in Phase III+)
  if (block.showInPhases && !block.showInPhases.includes(phaseId)) return [];

  // Run-progression block: dynamic items pulled from RUN_PROGRESSION by date
  if (block.runProgressionFor && block.runProgressionFor.includes(phaseId)) {
    const run = iso ? runForDate(iso) : null;
    if (!run) return [];
    return [{
      name: run.workout,
      detail: `${run.surface} · ~${run.durMin} min · ${run.label}`,
    }];
  }

  // Run-day compression: swap in the reduced Load prescription on run days
  if (dayIsRun && block.runDayByPhase && block.runDayByPhase[phaseId]) {
    return block.runDayByPhase[phaseId];
  }

  if (block.phaseGated && block.byPhase) {
    return block.byPhase[phaseId] || [];
  }
  return block.items || [];
}

export function fullModeItems(day, phaseId, iso) {
  const items = [];
  const dayContext = { isRunDay: isRunDayForPhase(day, phaseId) };
  day.blocks.forEach((block, bi) => {
    if (block.isRetrospective) return; // retrospective doesn't count toward checkboxes
    const blockItems = resolveBlockItems(block, phaseId, iso, dayContext);
    blockItems.forEach((it, ii) => {
      items.push({ id: `b${bi}_${ii}`, ...it, blockIndex: bi });
    });
  });
  return items;
}

export function floorModeItems(day) {
  return (day.floor || []).map((it, i) => ({ id: `floor_${i}`, ...it }));
}
