# Comeback

A biomechanics rebuild for a runner with a PRP-treated knee. PWA built with Vite + React. Installs to iPhone home screen as a standalone app.

## What V2 does

- **Day-of-week rotation.** Mon = hip + posterior chain. Tue = ankle/foot + single-leg. Wed = t-spine + core + carries. Thu = shoulders + upper push/pull. Fri = lower-body compound. Sat = aerobic + flow. Sun = soft tissue + retrospective.
- **Block-based sessions.** Every day runs through Prepare → Open → Load → Integrate → Finisher, with duration and emphasis on each block.
- **Phase-gated Load blocks.** Auto-detects your protocol day. Shows the right exercise prescription for Phase II Early, Phase II Late, Phase III, or Maintenance. Browse to a future date to preview what unlocks.
- **Three tracks.** Every day touches Ankle/Foot (A), Lumbar/Hip (B), and T-spine (C) at varying doses, visible as dot indicators at the top.
- **Full / Floor toggle.** Switch between the prescribed ~55 min full session and a ~20 min floor. Either one completes the day.
- **Saturday flow.** Six waves chained by body position — Supine → Side-lying → Prone → Quadruped → Standing → Cooling Down — instead of a flat list.
- **Sunday retrospective.** Four 1–10 body-check scores (ankle, low back, t-spine, knee) plus three text prompts. Saves locally.
- **Targets.** Concrete benchmarks for each day, not motivational filler.
- **Journey calendar.** Streak, total complete days, current protocol day. Green = complete, pale green = partial.
- **Offline-ready PWA.** Service worker caches everything after first load.

## Personalize before deploying

Open `src/protocol.js` and update the top of the file:

```js
export const PRP_DATE = '2026-05-18'; // your Day 0
export const TOTAL_DAYS = 84;          // 12 weeks
```

Want to change which exercises appear on which day? Scroll to the `DAYS` object — each day-of-week has a `blocks` array. Static blocks have an `items` array. The `Load` block has a `byPhase` map keyed by phase id (`p2early`, `p2late`, `p3`, `maint`). Add, remove, or rephrase to taste.

The Sunday retrospective prompts live in `DAYS[0].blocks` under the block with `isRetrospective: true`.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. Production build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub + Vercel

### 1. Push to a new GitHub repo

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/comeback.git
git push -u origin main
```

(Create the empty repo on github.com first — no README, no gitignore.)

### 2. Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your `comeback` repo
3. Vercel auto-detects Vite — leave all settings as default
4. Click **Deploy**

A minute later you'll get a URL like `comeback-xxx.vercel.app`. Every future `git push` to `main` auto-redeploys.

### 3. Install on your iPhone

1. Open the Vercel URL in **Safari** (must be Safari for PWA install on iOS)
2. Tap the **Share** button (square with up-arrow)
3. Scroll down and tap **Add to Home Screen**
4. Confirm the name "Comeback" and tap **Add**

The app now lives on your home screen with the upward-arrow icon. Opening it launches in standalone mode (no Safari chrome) and works offline.

## Data & privacy

Everything is stored in your browser's `localStorage`:
- `comeback_v2_completions` — your daily check-offs
- `comeback_v2_retrospectives` — your Sunday journal entries

Nothing leaves your phone. No accounts, no analytics, no server.

To wipe data: open the site in Safari → Settings → Safari → Advanced → Website Data → search for your URL → swipe to delete.

## File layout

```
comeback/
├── public/              # PWA icons
├── src/
│   ├── main.jsx         # entry
│   ├── App.jsx          # all UI components + styles
│   ├── protocol.js      # weekly program data + helpers (EDIT ME)
│   └── index.css        # global styles + Google Fonts
├── index.html
├── vite.config.js       # PWA config
└── package.json
```

## Not medical advice

This is a personal tracker for one specific PRP rehabilitation timeline. Exercises and progressions are adapted from established frameworks (post-PRP rehab, Knees Over Toes, Functional Range Conditioning, Postural Restoration Institute, ATG). If anything here conflicts with what your physician or physical therapist tells you, follow them.
