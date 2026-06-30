// ============================================================
// EXERCISE LIBRARY
// Setup · Execution · Cues · Faults · Source for every exercise
// in the V2 protocol. Matched to display names by an alias +
// substring lookup so variations ("RDL practice (BW)" / "Heavy
// RDL") all resolve to the right entry.
// ============================================================

export const exerciseLibrary = {

  // ============================================================
  // BREATHING & RESET
  // ============================================================
  '90/90 breathing': {
    aliases: ['final 90/90 breathing', '90/90 breathing supine', '90 90 breathing'],
    setup: 'Supine. Hips and knees bent 90°, calves resting on a chair seat or couch. Low back flat to floor.',
    execution: 'Inhale through nose 4 sec, filling the back of ribs and low belly. Exhale through pursed lips 8 sec, drawing ribs down and pelvis under. 5 breaths per side.',
    cues: 'Long exhale does the work — activates obliques, resets the tight lumbar pattern. Knees stay together.',
    faults: 'Arching the low back. Chest breathing instead of breathing into the ribs and belly.',
    source: 'Postural Restoration Institute',
  },

  // ============================================================
  // JOINT CARs
  // ============================================================
  'Hip CARs': {
    aliases: ['standing hip cars'],
    setup: 'Standing on one leg, hand on wall for balance. Or quadruped if balance is the limiter.',
    execution: 'Lift opposite knee in front to max height. Externally rotate so knee moves out to the side at hip height. Internally rotate (foot moves up and across). Extend leg behind. Reverse direction. 5–10 sec per full circle.',
    cues: 'Trunk and standing leg stay perfectly still. Only the hip moves.',
    faults: 'Trunk leaning to fake range. Knee dropping below hip height. Speeding up.',
    source: 'Functional Range Conditioning',
  },

  'Knee CARs': {
    setup: 'Standing on one leg, opposite knee lifted to hip height (wall for balance).',
    execution: 'From the lifted position, draw the largest possible circle with the foot. The femur stays absolutely still — only the knee joint moves. 5 circles each direction, each leg.',
    cues: 'Tiny circles mean you\'re cheating. Push range while keeping femur fixed.',
    faults: 'Moving the hip. Tiny circles.',
    source: 'Functional Range Conditioning',
  },

  'Ankle CARs': {
    aliases: ['ankle cars both sides'],
    setup: 'Seated with leg extended, or standing with knee lifted and foot relaxed.',
    execution: 'Lower leg stays motionless. Draw the largest possible circle with the toes: plantarflex → evert → dorsiflex → invert. Reverse direction. 5 circles each direction.',
    source: 'Functional Range Conditioning',
  },

  'Shoulder CARs': {
    setup: 'Standing, arms at sides.',
    execution: 'One arm at a time. Lift forward, up, behind, down — drawing the largest possible circle with the hand. Reverse direction. 5 sec per quarter circle.',
    cues: 'Trunk stays perfectly still. Engage opposite glute to prevent compensation.',
    source: 'Functional Range Conditioning',
  },

  // ============================================================
  // SOFT TISSUE
  // ============================================================
  'Lacrosse ball under arch': {
    aliases: ['lacrosse ball foot massage', 'lacrosse ball: feet'],
    setup: 'Stand or sit. Ball under arch of one foot.',
    execution: 'Roll slowly heel to toe. At sore spots, pause 30 sec with moderate pressure while spreading toes.',
  },

  'Tennis ball on calf': {
    setup: 'Seated, leg extended, tennis ball under calf.',
    execution: 'Roll from above ankle to below knee. At sore spots, bend and straighten the knee while pressure is on to floss the tissue.',
  },

  'Lacrosse ball on pec': {
    aliases: ['lacrosse ball: pecs', 'lacrosse ball pec'],
    setup: 'Face a wall. Ball pressed between pec and wall, just below collarbone, lateral to sternum.',
    execution: 'Lean weight in. Slowly raise and lower the arm on that side to floss the tissue. 60–90 sec each side.',
  },

  'Lacrosse ball on upper trap': {
    setup: 'Lying on the ground, ball under upper trap (between spine and shoulder blade).',
    execution: 'Find a sore spot, pause 30 sec, slowly raise and lower the arm to floss.',
  },

  'Peanut on t-spine': {
    aliases: ['peanut t-spine', 'peanut: t-spine', 'peanut on individual segments'],
    setup: 'Two lacrosse balls in a sock, knotted tight to form a "peanut." Lie on back with peanut placed at the base of t-spine (just above where ribs end). Spine sits in the gap; balls press on either side of each vertebra.',
    execution: 'Hands behind head. Slowly arch backward over the peanut. Hold 30 sec, breathe deep. Slide up one segment. Repeat at 4–5 segments up the t-spine.',
    cues: 'Should hurt-good, not pinch. Anything sharp or radiating means reposition.',
    faults: 'Pressing into the lumbar spine — peanut should never go below the bottom of the ribs.',
    source: 'Functional Range Conditioning self-care',
  },

  'Foam roll t-spine': {
    aliases: ['foam roll: t-spine', 'foam roll t-spine standard'],
    setup: 'Roller perpendicular to spine, mid t-spine. Hands behind head.',
    execution: 'Slowly extend over the roller. Inhale at extension peak, exhale to relax further. Move up and down the t-spine. 2–3 min.',
    faults: 'Rolling into the lumbar — stay above the bottom rib edge.',
  },

  'Foam roll quads': {
    aliases: ['foam roll quads + glutes', 'foam roll: quads'],
    setup: 'Prone on the roller, weight on forearms.',
    execution: 'Roll from hip flexor down to just above the knee. Pause and breathe at sore spots. 60–90 sec.',
  },

  'Foam roll glutes': {
    aliases: ['foam roll: glutes'],
    setup: 'Seated on the roller, one ankle crossed over opposite knee for added pressure.',
    execution: 'Lean into the side of the glute, roll slowly to find dense spots, pause and breathe. 60–90 sec each side.',
  },

  'Foam roll calves': {
    setup: 'Seated, roller under one calf, other foot can stack on top for added load.',
    execution: 'Roll from above ankle to below knee. Bend and straighten the knee at sore spots to floss. 60–90 sec each side.',
  },

  'Foam roll IT-band area': {
    aliases: ['foam roll: it-band area'],
    setup: 'Side-lying on the roller, top hand on floor for support.',
    execution: 'Roll from hip down to just above knee on the lateral quad / TFL (not the IT band proper, which doesn\'t stretch). Pause and breathe at sore spots. 60–90 sec each side.',
  },

  'Foam roll lats': {
    aliases: ['foam roll: lats'],
    setup: 'Side-lying with arm overhead, roller under the lat (armpit area).',
    execution: 'Slow roll from armpit down ribcage. Pause and breathe at sore spots. 60 sec each side.',
  },

  // ============================================================
  // MOBILITY & OPENING
  // ============================================================
  '90/90 transitions': {
    aliases: ['sit up: 90/90 transitions'],
    setup: 'Seated on floor. One leg in front bent 90° at hip and 90° at knee. Other leg behind in the same 90/90 position.',
    execution: 'Without using hands, rotate both knees over to the opposite side, ending with the back leg now in front. Pause, square the chest forward, drive both knees flat to floor. Reverse.',
    cues: 'Drive both knees flat — this is internal hip rotation (front leg) and external rotation (back leg), the two ranges most adults are most limited in. Pause 3 sec at each end.',
    source: 'Functional Range Conditioning',
  },

  'Hip airplane': {
    setup: 'Stand on one leg, slight bend in standing knee. Arms out wide like wings.',
    execution: 'Hinge forward from the hip, extending the back leg behind so back leg, hips, and spine form one rigid line. Once horizontal, rotate the lifted hip down toward the floor (internal rotation of standing hip) then up toward the ceiling (external rotation). Slow.',
    cues: 'The motion is at the standing hip socket. The torso is along for the ride.',
    faults: 'Standing knee bending more during rotation. Rotating from the spine instead of the hip.',
    source: 'Single-leg training (Boyle)',
  },

  'Cossack squat flow': {
    setup: 'Wide stance, feet pointed slightly out.',
    execution: 'Shift weight to one side, bending that knee and sinking down. Opposite leg stays straight with foot flexed (toes up). Hands can hold opposite foot for leverage. Slowly transition through the bottom to the other side. 4/side.',
    cues: 'Heels stay down. Chest stays open. The straight leg\'s hamstring and adductor are doing the mobility work. 5+ sec per side.',
    faults: 'Heels lifting. Knee caving on the bent side.',
  },

  'Pigeon w/ active reaches': {
    aliases: ['pigeon with active reaches', 'pigeon'],
    setup: 'From quadruped, bring one shin in front on the floor, roughly parallel to mat (modify shin angle inward if knee complains). Back leg extends straight behind.',
    execution: 'Square hips toward the floor. Stay tall through the spine. Reach with the opposite arm out to the side, then up, then forward — each reach for 5 sec. Active throughout, no collapsing.',
    source: 'Yoga / general mobility',
  },

  'Banded ankle distraction': {
    setup: 'Anchor long band low. Loop around the top of your foot, just below ankle joint. Step the foot away from anchor until band is taut.',
    execution: 'In a half-kneeling position with the banded foot forward, drive the knee forward over the toes, keeping heel planted. The band pulls the tibia forward as the talus stays back, decompressing the joint. 10 deep pulses each side, 2 sets.',
    cues: 'The knee should travel well past the toes. If you can\'t keep the heel down, you\'ve found end range — work there.',
    faults: 'Heel lifting. Not pulsing into end range.',
    source: 'Knees Over Toes / Ben Patrick',
  },

  'Deep squat hold w/ elbow wedge': {
    aliases: ['deep squat hold with elbow wedge'],
    setup: 'Squat down as low as comfortable, feet hip-width and angled slightly out.',
    execution: 'Hands together at chest, elbows inside the knees. Use elbows to push the knees outward gently. Chest stays tall. Hold 60 sec.',
    cues: 'Elbows are the leverage point. Drive both knees out without losing chest position.',
  },

  'Wall-banded dorsiflexion': {
    setup: 'Standing facing a wall, long band looped around shin/ankle, anchored low behind you.',
    execution: 'Step forward into a small lunge, banded foot forward. Drive the knee toward the wall while keeping the heel planted. Repeat 10 reps each side.',
    cues: 'The band is pulling the tibia forward — let it. Keep heel down.',
  },

  'Calf stretch split stance': {
    setup: 'Staggered stance against a wall or chair. Hands on wall, lean weight forward.',
    execution: 'Gastroc version: back knee straight, heel down, 60 sec. Soleus version: back knee bent, heel down, 60 sec. Each side.',
    cues: 'The stretch is at the back leg\'s calf. Heel must stay planted.',
  },

  'Couch stretch': {
    aliases: ['couch stretch shift'],
    setup: 'Half-kneeling with back foot up against a wall or couch, shin vertical against the surface, knee on a soft pad. Front foot planted in a lunge stance.',
    execution: 'Squeeze the back glute hard. Drive the hips forward. Hold tall through the front knee. 60–90 sec each side.',
    cues: 'Glute squeeze is what makes this work. Without it, you\'re just passively stretching the hip flexor. With it, you\'re teaching the hip flexor to lengthen while the glute fires.',
    faults: 'Arching low back to fake hip extension. Letting the glute relax.',
    source: 'Kelly Starrett / ATG',
  },

  'Open book rotations': {
    aliases: ['open books'],
    setup: 'Side-lying, knees stacked and bent 90°, arms straight out in front (palms together).',
    execution: 'Keep knees stacked and pressed together. Lift the top arm up and over, opening the chest toward the ceiling, head following the hand. Try to touch the back of the top hand to the floor behind you. Hold 2 sec. Return. 8 each side.',
    cues: 'The rotation should come from the t-spine, not the lumbar. Knees locked together isolates the rotation above.',
    source: 'Stuart McGill / general PT',
  },

  'Quadruped t-spine rotation w/ reach': {
    aliases: ['quadruped t-spine rotation with reach', 'quadruped t-spine rotation', 'quadruped rotation with reach'],
    setup: 'Quadruped position, one hand behind head.',
    execution: 'Slowly rotate the elbow down toward the opposite wrist, then up toward the ceiling. Eyes follow the elbow. 8 each side.',
    faults: 'Rotating from the lumbar (low back arches/rounds).',
  },

  'Thread the needle hold': {
    setup: 'Quadruped.',
    execution: 'Slide one arm under the body, palm up, reaching as far as possible toward the opposite side. Drop the shoulder and side of the head to the floor. Hold 30 sec, breathing deep into the upper back.',
  },

  'Half-kneeling thoracic rotation w/ reach': {
    aliases: ['half-kneeling t-spine rotation w/ reach', 'half-kneeling t-spine rotation'],
    setup: 'Half-kneeling (one knee down, opposite foot forward). Both hands behind head.',
    execution: 'Rotate slowly toward the side of the down knee. Pause at end range, reach the elbow further. Return. 8 each side.',
    source: 'Functional Range Conditioning',
  },

  'Side-lying windmill': {
    setup: 'Side-lying, knees bent 90° and stacked. Top hand sweeps from in front of body in a wide arc overhead and behind.',
    execution: 'Knees stay glued together throughout. Eyes follow the hand. 8 reps each side.',
    cues: 'Goal: hand touches floor behind you.',
  },

  'Banded shoulder dislocates': {
    aliases: ['banded dislocates'],
    setup: 'Long band held overhand, hands wide apart.',
    execution: 'With straight arms, lift the band up overhead and behind you, then back over the front. Slow, smooth, no jerking.',
    cues: 'Ribs stay down. Don\'t compensate by arching the back. Narrower grip = harder; start wide.',
  },

  'Banded lat stretch': {
    setup: 'Long band anchored overhead (door hinge, pull-up bar). Grip with one hand, palm down. Step back until band is taut.',
    execution: 'Hinge at the hip away from anchor, opposite hand on hip. Sit into the stretch, letting the lat lengthen. Rotate the hand palm-up at the top to add t-spine extension. 60 sec each side.',
  },

  'Banded posterior capsule stretch': {
    setup: 'Long band anchored at chest height. Grip with the arm opposite the anchor side.',
    execution: 'Step away, cross the arm across the body, let the band pull the shoulder into horizontal adduction. 60 sec each side.',
  },

  'Prone Y-T-W-L': {
    setup: 'Lie face-down, forehead on a towel.',
    execution: 'Squeeze shoulder blades together and lift arms off the floor in each of four positions: Y (overhead, thumbs up), T (out to sides), W (elbows bent and pulled to ribs), L (arms in W then rotated externally). Hold each 2–3 sec. 5 each position.',
  },

  'World\'s greatest stretch': {
    aliases: ['worlds greatest stretch'],
    setup: 'Lunge position, opposite hand on floor inside the front foot.',
    execution: 'Rotate the lunge-side arm up to the ceiling, eyes following. Pause. Lower the elbow down to inside the front foot. Pause. Sweep the back leg knee out wide for an external rotation stretch. Rock back to a hamstring stretch with front leg straight. 5 cycles per side.',
    source: 'General dynamic warmup',
  },

  'Wall slides': {
    setup: 'Back against wall, arms in goal-post position (elbows at shoulder height, bent 90°, backs of hands and elbows against wall).',
    execution: 'Slide arms up the wall to full extension overhead. Maintain wall contact the whole time. Slow return.',
    cues: 'If hands or elbows can\'t stay on the wall, you\'ve found your shoulder mobility limit — work there.',
  },

  'Cat/cow segmental': {
    aliases: ['cat/cow', 'cat / cow'],
    setup: 'Quadruped.',
    execution: 'Slowly arch (cow) and round (cat) the spine. Focus on segmental movement — try to articulate each vertebra in sequence rather than moving as a block.',
  },

  // ============================================================
  // STRENGTH — CORE
  // ============================================================
  'Bird dog': {
    aliases: ['bird dog row', 'bird dog row w/ band'],
    setup: 'Quadruped, neutral spine.',
    execution: 'Simultaneously extend opposite arm and leg until both are parallel to floor. Hold 2 sec. Return slowly. The pelvis and ribs should not move at all — only the limbs.',
    cues: 'Imagine a glass of water on your low back. Don\'t spill it.',
    source: 'Stuart McGill',
  },

  'Dead bug': {
    aliases: ['dead bug rocks'],
    setup: 'Supine, arms reaching to ceiling, knees and hips bent 90° (tabletop legs).',
    execution: 'Slowly lower one arm overhead and the opposite leg toward the floor, keeping low back pinned flat. Return. Switch.',
    cues: 'Low back stays glued to floor. If it lifts, your range is shorter — don\'t extend as far.',
  },

  'Hollow body hold': {
    setup: 'Supine, arms overhead, legs straight.',
    execution: 'Press low back into floor. Lift shoulders and legs slightly. Hold the position, breathing through the brace. 20–30 sec.',
  },

  'Side plank': {
    aliases: ['side plank reach-through'],
    setup: 'Forearm on floor, body in straight line, top foot stacked.',
    execution: 'Hold the position. Hips up, body straight, no sag.',
    cues: 'Drive the forearm into floor to elevate the down-side shoulder.',
  },

  'Copenhagen plank': {
    setup: 'Top foot on a bench, bottom leg under, top adductor doing the work.',
    execution: 'Hold the plank position with the top adductor driving down into the bench. For added load, lift the bottom leg to meet the bench.',
  },

  'Pallof press': {
    aliases: ['pallof press + rotation', 'pallof + rotation'],
    setup: 'Short or long band anchored at chest height. Stand sideways to anchor, hands gripping band at chest.',
    execution: 'Press hands straight out from chest. The band wants to rotate you — resist. Return. 10 reps each direction.',
    cues: 'Don\'t twist toward the anchor. Hips and shoulders stay square forward.',
  },

  'Plank rocks': {
    setup: 'Forearm plank.',
    execution: 'Slowly shift body weight forward over the elbows, then back. Knees down if needed.',
  },

  // ============================================================
  // STRENGTH — UPPER PUSH/PULL
  // ============================================================
  'Banded row': {
    setup: 'Long band anchored at chest height. Seated or standing, both hands on band, arms extended.',
    execution: 'Pull the elbows back behind you, squeezing shoulder blades together at the end. Slow return.',
  },

  'Pushup': {
    aliases: ['pushup w/ shoulder tap', 'pushup with shoulder tap', 'decline or archer pushup'],
    setup: 'Hands shoulder-width, elbows tracking back at about 45°, body in a straight line.',
    execution: 'Lower until chest grazes the floor. Push back up.',
    faults: 'Hips sagging (no core brace). Elbows flared 90° (shoulder stress).',
  },

  'Banded shoulder press': {
    aliases: ['banded overhead press', 'banded or kb shoulder press', 'kb press'],
    setup: 'Stand on long band, hands gripping it at shoulder height.',
    execution: 'Press up to lockout overhead. Slow return.',
  },

  'Banded face pull': {
    setup: 'Long band anchored at face height. Grip with both hands, palms down, arms extended.',
    execution: 'Pull the band toward your face, leading with the elbows out wide. End with the hands at temples, elbows up high.',
    cues: 'Rear-delt and external-rotation exercise — the more you rotate the hands outward at the end, the better.',
  },

  'Scap pull': {
    setup: 'Hanging from a bar (or band assisted).',
    execution: 'Arms stay straight. Pull the shoulder blades down and back, lifting the body 2–3 inches. Hold 1 sec. Return.',
  },

  'Banded pull-apart': {
    setup: 'Long band held in both hands at chest height, arms extended.',
    execution: 'Pull the hands apart out to the sides, ending with arms wide. Squeeze the shoulder blades together. Slow return.',
  },

  'Banded W raise': {
    setup: 'Long band anchored at chest height, both hands gripping with elbows at sides, bent 90°.',
    execution: 'Externally rotate the shoulders (forearms rotate from in-front to out-to-sides). 12 reps slow.',
  },

  'Banded internal/external rotation': {
    aliases: ['banded int/ext rotation', 'banded internal / external rotation'],
    setup: 'Elbow at 90°, glued to side. Band anchored at elbow height.',
    execution: 'Rotate hand out / in against band resistance.',
  },

  'Pull-up': {
    aliases: ['banded pull-up'],
    setup: 'Hanging from a bar, full hang. For banded version, loop a long band over the bar with a foot in it for assistance.',
    execution: 'Pull chest toward the bar. Elbows track down and slightly back.',
    cues: 'Initiate with the scapulae — pull the shoulder blades down first, then bend the elbows.',
  },

  'KB row': {
    setup: 'One hand on a bench or surface for support, opposite hand holding KB.',
    execution: 'Row the KB toward your hip, elbow tracks back. Squeeze the lat at top. Slow return.',
  },

  'Dead hang': {
    setup: 'Hanging from a bar, full grip, arms straight.',
    execution: 'Let the body hang. Don\'t actively shrug — let the shoulders relax up toward the ears. 30–60 sec.',
    cues: 'Decompression. The longer you can relax, the better the spinal release.',
  },

  // ============================================================
  // STRENGTH — LOWER BODY
  // ============================================================
  'Goblet squat': {
    aliases: ['heavy goblet/loaded squat', 'goblet squat (kb if equipped)'],
    setup: 'Hold a kettlebell or dumbbell at chest height with both hands. Stance about hip-width, toes slightly out.',
    execution: 'Squat to depth (knees out, chest up), drive up. Slow tempo for Phase II Late, normal tempo for Phase III.',
    faults: 'Knees caving in. Heels lifting (sign that ankle mobility needs more work).',
  },

  'Bodyweight squat': {
    execution: 'Same form as goblet squat, no weight. Add a slow 3-sec lowering for Phase III.',
    faults: 'Knees caving. Heels lifting. Rounded low back at bottom.',
  },

  'Glute bridge': {
    aliases: ['banded glute bridge', 'glute bridge variation'],
    setup: 'Supine, knees bent, feet flat.',
    execution: 'Drive through heels, lift hips until thighs and torso form one line. Squeeze glutes hard at top.',
    cues: 'It\'s a glute exercise. If hamstrings cramp, you\'re using them too much — tuck pelvis under at the top.',
  },

  'Single-leg glute bridge': {
    aliases: ['bridges with leg lift', 'single leg glute bridge'],
    setup: 'Supine, knees bent. Lift one foot off floor, knee tucked toward chest.',
    execution: 'Drive through the planted heel, lift hips. Don\'t let the hips dump to one side. Slow return.',
  },

  'Step-up': {
    aliases: ['concentric step-up to low box', 'step-up controlled down', 'step-up to higher box'],
    setup: 'Box or sturdy step, 4–12 inches depending on phase and capacity.',
    execution: 'Step one foot up onto the box. Drive through that heel to stand all the way up. Step down with control.',
    cues: 'Phase II: no slow eccentric — just controlled. Phase III: can emphasize the lowering.',
    faults: 'Pushing off the back foot for momentum. Knee caving in.',
  },

  'Lateral step-down': {
    setup: 'Stand on a box (4–8 in), one foot hanging off the side. Phase III only.',
    execution: 'Slowly bend the standing knee, lowering the off-foot heel to tap the floor over 3–5 seconds. Drive back up. 12 reps each side.',
    cues: 'The standing knee must track over the middle toes. No caving in. This is the foundational eccentric exercise for patellofemoral rehab.',
    source: 'PT standard / KOT',
  },

  'Wall sit': {
    setup: 'Back flat to wall, feet about 18 inches forward, slide down to a quarter or half squat.',
    execution: 'Hold. Drive knees out slightly. 30–45 sec.',
  },

  'Calf raise': {
    aliases: ['double-leg calf raise', 'standing calf raise'],
    setup: 'Standing on edge of step, balls of feet on edge.',
    execution: 'Lower heels below step, rise to full plantarflexion. Slow.',
  },

  'Single-leg calf raise': {
    aliases: ['single-leg calf raise w/ 3-sec eccentric', 'loaded single-leg calf raise'],
    setup: 'Standing on one leg on edge of step, ball of foot on edge.',
    execution: 'Lower heel below step, rise to full plantarflexion. For Phase III: 3-sec eccentric on the way down. Build to full ROM 15 reps.',
    cues: 'Critical exercise for runners — the calf is the primary absorber of landing forces.',
  },

  'Banded TKE': {
    aliases: ['banded tke single-leg', 'tke with resistance band'],
    setup: 'Loop long band around a sturdy anchor at knee height. Step inside the loop so the band is behind your knee.',
    execution: 'Step away from anchor until band is taut, knee slightly bent. Push the knee back into full extension against the band. Slow.',
    source: 'PT standard',
  },

  'Bulgarian split squat': {
    aliases: ['loaded bulgarian split squat'],
    setup: 'Rear foot elevated on a bench or chair. Front foot far enough forward that knee tracks over toes at bottom.',
    execution: 'Lower until back knee is just above floor (or until comfortable). Drive back up. Upright torso.',
  },

  'RDL': {
    aliases: ['rdl practice', 'rdl practice (bw)', 'loaded rdl', 'loaded rdl (kb/db)', 'heavy rdl', 'romanian deadlift'],
    setup: 'Standing tall, feet hip-width.',
    execution: 'Hinge at the hips, sending the butt back. Knee stays soft but doesn\'t bend much. Chest forward, back flat. Lower until you feel a strong hamstring stretch, return.',
    cues: 'This is a hip exercise, not a knee exercise. If your knees move forward, you\'re squatting, not hinging.',
  },

  'Single-leg RDL': {
    aliases: ['loaded single-leg rdl'],
    setup: 'Standing tall on one leg. Other foot off floor, knee slightly bent.',
    execution: 'Hinge at the standing hip, sending the lifted leg straight back behind you. Back leg, hips, and torso stay in one line. Lower until you feel a strong hamstring stretch in the standing leg, return.',
    cues: 'Hip stays square — don\'t open up toward the working leg. The motion is in the standing hip.',
  },

  'KOT slant-board squat': {
    aliases: ['kot slant board squat', 'slant-board squat'],
    setup: 'Stand on a slant board with heels elevated 25–30° (knees-up incline).',
    execution: 'Bodyweight squat to depth. The heel-elevated position biases the quad and reduces ankle demand, which lets you load the knee in a position the patellofemoral joint tolerates.',
    source: 'Knees Over Toes / Ben Patrick',
  },

  'ATG split squat': {
    aliases: ['atg split squat (assisted)', 'loaded atg split squat'],
    setup: 'Long lunge stance.',
    execution: 'Lower until back knee touches the floor and front shin is past vertical (knee well past toes). Drive back up. Start with bodyweight, build to weighted over weeks.',
    cues: 'The shin past vertical is the point — this is the position runners\' knees need to tolerate, and traditional training avoids it.',
    source: 'Ben Patrick / ATG',
  },

  'Sissy squat': {
    aliases: ['sissy squat (mobility version)'],
    setup: 'Standing, hands at side or holding a support for balance. Phase III only.',
    execution: 'Rise onto the balls of the feet. Lean backwards from the knees while keeping a straight line from knees to head. Lower as far as comfortable. Slow return.',
    cues: 'If knee complains, regress range.',
  },

  'Pistol squat progression': {
    aliases: ['pistol progression'],
    execution: 'Box-assisted: squat to a box on one leg. As strength builds, lower the box. Eventually: full pistol.',
  },

  'KB swing': {
    aliases: ['heavy kb swing'],
    setup: 'Kettlebell on floor in front, feet hip-width.',
    execution: 'Hinge to grip KB. Hike it between legs explosively. Stand up tall, snapping hips forward — the KB floats to chest height on the momentum (not lifted with arms). Catch and reverse.',
    cues: 'It\'s a hip hinge, not a squat. Arms are ropes, not levers.',
  },

  'Suitcase carry': {
    aliases: ['suitcase carry (loaded backpack)', 'heavier suitcase carry', 'heavy suitcase carry'],
    setup: 'Pick up a weight in one hand.',
    execution: 'Stand tall, walk slowly. Brace the trunk to prevent any lean toward the loaded side. The unloaded side\'s obliques are doing the work.',
    cues: 'One-sided load = anti-lateral-flexion core training. The trunk must NOT lean.',
  },

  'Farmer\'s carry': {
    aliases: ['heavy farmers carry', 'farmers carry'],
    setup: 'Pick up a weight in each hand.',
    execution: 'Stand tall, walk slowly. Shoulders packed back, ribs down, full body brace.',
  },

  'Overhead carry': {
    setup: 'Press one weight overhead, lock arm out.',
    execution: 'Walk while holding the weight locked out. Keep ribs down, don\'t arch low back. Switch sides.',
  },

  'Pogo hops': {
    setup: 'Standing, knees soft.',
    execution: 'Small bouncy hops, staying on the balls of the feet. Quick ground contact, minimal knee bend. 20–30 per set.',
    source: 'Plyometric prep',
  },

  // ============================================================
  // ACTIVATION & ISOLATION
  // ============================================================
  'Tibialis raises': {
    aliases: ['tibialis raise', 'tibialis raise w/ band'],
    setup: 'Standing with back and heels against a wall, feet stepped out 6–8 inches.',
    execution: 'Lift toes toward shins as high as possible. Slow lower. Add band tension or hold a plate against shins for progression.',
    cues: 'Bulletproofs shins and controls foot strike at landing. Highest-leverage runner exercise.',
    source: 'Knees Over Toes',
  },

  'Tibialis wall hold isometric': {
    setup: 'Same as tibialis raise — back against wall, heels stepped out.',
    execution: 'Hold the foot at top of the dorsiflexion range (toes up). 30 sec, 2 rounds.',
  },

  'Short arc quads': {
    setup: 'Supine, bolster (foam roller or rolled towel) under the knee so the knee is slightly bent.',
    execution: 'Extend the lower leg until knee is fully straight. Squeeze the quad for 2 sec at the top. Lower slowly. 15 reps per leg.',
  },

  'Straight leg raise': {
    aliases: ['slr'],
    setup: 'Supine, opposite knee bent and foot flat for low back protection.',
    execution: 'Lock the working knee absolutely straight (quad set first). Then lift the straight leg ~12 inches off the floor. Slow lower.',
    cues: 'Knee lock first, then lift. If knee bends during the lift, you\'ve lost it.',
  },

  'Clamshells': {
    aliases: ['banded clamshells'],
    setup: 'Side-lying, knees bent, feet together.',
    execution: 'Open the top knee toward the ceiling without rolling the hips back. Slow return. Add a short band around knees for progression.',
    cues: 'Don\'t roll the pelvis back to fake range.',
  },

  'Side-lying hip abduction': {
    setup: 'Side-lying, top leg straight, bottom leg can be bent.',
    execution: 'Top leg straight, toes pointed slightly down (engages glute med, not hip flexor). Lift toward ceiling, slow return.',
  },

  'Psoas march': {
    setup: 'Seated tall on edge of chair, or supine. Light band around forefoot if standing.',
    execution: 'Lift knee toward chest against band resistance, hold 1 sec at top. Slow return. 10 per side.',
    cues: 'Hip flexor endurance — important for late-stride leg recovery while running.',
  },
};


// ============================================================
// LOOKUP — fuzzy match display name → library entry
// ============================================================
const SORTED_KEYS = Object.keys(exerciseLibrary).sort((a, b) => b.length - a.length);

export function lookupExercise(displayName) {
  if (!displayName) return null;
  const name = displayName.toLowerCase().trim();

  // 1. Exact match on key or alias
  for (const key of Object.keys(exerciseLibrary)) {
    if (key.toLowerCase() === name) return { key, ...exerciseLibrary[key] };
    const aliases = exerciseLibrary[key].aliases;
    if (aliases) {
      for (const alias of aliases) {
        if (alias.toLowerCase() === name) return { key, ...exerciseLibrary[key] };
      }
    }
  }

  // 2. Strip parenthetical content and retry
  const stripped = name.replace(/\s*\([^)]*\)\s*/g, '').trim();
  if (stripped !== name && stripped.length > 2) {
    for (const key of Object.keys(exerciseLibrary)) {
      if (key.toLowerCase() === stripped) return { key, ...exerciseLibrary[key] };
      const aliases = exerciseLibrary[key].aliases;
      if (aliases) {
        for (const alias of aliases) {
          if (alias.toLowerCase() === stripped) return { key, ...exerciseLibrary[key] };
        }
      }
    }
  }

  // 3. Substring match — longest keys first so more specific entries win
  for (const key of SORTED_KEYS) {
    const k = key.toLowerCase();
    if (k.length >= 4 && name.includes(k)) return { key, ...exerciseLibrary[key] };
    const aliases = exerciseLibrary[key].aliases;
    if (aliases) {
      for (const alias of aliases) {
        const a = alias.toLowerCase();
        if (a.length >= 4 && name.includes(a)) return { key, ...exerciseLibrary[key] };
      }
    }
  }

  return null;
}
