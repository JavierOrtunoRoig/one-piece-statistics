# One Piece / One Pace Tracker

A web application to visually track and compare your progress watching One Piece and One Pace episodes. This project lets users mark episodes as watched, view time statistics, and explore completion charts using interactive graphs.

---

## ✨ Features

- ✅ Track viewing progress separately for One Piece and One Pace.
- ⏱ View total, watched, and remaining time per arc, saga, and full series.
- 🔺 Interactive bar and pie charts with chart.js.
- 🌟 Visually styled using TailwindCSS with animations powered by Framer Motion.
- 🔐 Local progress is saved in localStorage, per series.
- ▶ Mark individual episodes or whole arcs as watched/unwatched.
- ⇈ Automatic prioritization: first incomplete arc is always shown first.

---

## 🔧 Setup

```
npm install
npm dev
```

---

## 📁 Project Structure

- components/ # UI components: EpisodeCard, ArcInfo, Charts, NavButton...
- context/ # SerieProvider and custom useSerieProgress hook
- helpers/ # Utilities for time, reducer, classnames, data merging
- pages/ # Next.js page structure (One Piece, One Pace, stats...)
- assets/ # Static JSON data for episodes (one_piece.json, one_pace.json)

---

## 🌐 Technologies

- Next.js 15 (App Router)
- TypeScript
- TailwindCSS
- Framer Motion
- Chart.js

---

## ⚖️ Architecture Highlights

### 🛋‍ Local Storage Persistence

- Each series (one_piece, one_pace) is persisted using a unique key.
- On first load, if progress exists in localStorage, it merges with the base JSON.

### 🔄 Context-based State Management

- SerieProvider + useSerieProgress manages the state per series.
- Actions are dispatched via reducer (TOGGLE_EPISODE).

### 🌎 Dynamic Statistics & Visualization

- Time calculations use pure helpers (getArcWatchedTime, getSerieTotalTime, etc).
- Charts are dynamically generated and colored using HSL-based utility.
- Progress bar color interpolates from red > yellow > green based on completion.
- Make sure the JSON files (one_piece.json, one_pace.json) are present in /assets.

---

Made with ❤️ by a One Piece fan who had enough of filler.
