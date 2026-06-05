# Comeback

Personal knee rehab tracker. A Progressive Web App (PWA) that shows your daily exercises, tracks completion, and visualizes your 12-week recovery journey on a calendar.

Built with Vite + React + lucide-react. Deploys as a static site. Installs to iPhone home screen as a standalone app.

## What's inside

- **Today view** — shows the workout for the current date based on your PRP date and the day of the week. Tap to check off exercises; the progress bar fills in real-time.
- **Journey view** — month-by-month calendar with completed days marked, plus streak/total/protocol-day stats at the top.
- **Phase-aware** — the app knows which protocol phase you're in (Lay Low → Wake It Up → Build the Base → Get Strong → Maintenance) and pulls the right exercise menu and weekly session for each day.
- **Running progression** — during Phase III, the "Easy Run" workout auto-updates each week (1/2 intervals → 2/1 → 3/1 → 5/1 → continuous → strides).
- **Offline-ready** — once installed, works without internet.

## Personalize before deploying

Open `src/protocol.js` and update the top of the file:

```js
export const PRP_DATE = '2026-05-18'; // your Day 0
export const TOTAL_DAYS = 84;          // 12 weeks
```

Want to tweak which exercises appear on which day? Scroll to the `PHASES` array — each phase has a `daily` list (always done) and a `weekly` map (keyed by day-of-week, 0=Sun..6=Sat). Add/remove exercise IDs to taste.

## Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. To test the production build:

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

(Create the repo on github.com first — empty, no README.)

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

Everything is stored in your browser's `localStorage` under the key `comeback_completions_v1`. Nothing leaves your phone. No accounts, no analytics, no server.

To wipe data: open the site, then in Safari go to Settings → Safari → Advanced → Website Data → search "your-vercel-url" → swipe to delete.

## File layout

```
comeback/
├── public/              # icons (PNG)
├── src/
│   ├── main.jsx         # entry
│   ├── App.jsx          # all UI components + styles
│   ├── protocol.js      # exercise library, phases, helpers (EDIT ME)
│   └── index.css        # global styles + Google Fonts import
├── index.html
├── vite.config.js       # PWA config lives here
└── package.json
```

## Not medical advice

This is a personal tracker built around one person's PRP rehabilitation timeline. The exercises and progressions are adapted from a general post-PRP protocol plus standard "bulletproof knees" runner programming. If anything here conflicts with what your physician or physical therapist tells you, follow them, not the app.
