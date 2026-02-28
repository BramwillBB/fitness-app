# IronCore — Fitness Tracker

A modern, mobile-optimized web app for managing and tracking a science-backed 4-day exercise program. Built with gamification, smart analytics, and cloud sync.

## Features

- **Interactive Workout Logging** — Log weight, reps, duration, distance, and heart rate for every exercise in real time
- **Expert Exercise Tips** — Evidence-based execution advice for every movement
- **Smart Rest Timer** — Circular countdown timer between sets with ±10-second adjustment
- **Screen Wake Lock** — Phone screen stays on during workouts (Wake Lock API)
- **Gamification** — Earn XP, maintain streaks, unlock levels and badges
- **Workout Summary** — Full breakdown of your session including total volume, completion %, and XP earned
- **Smart Analytics** — Track lifetime stats, recent sessions, and level progression
- **Previous Workout Memory** — Automatically loads your last logged weight/reps at the start of each new session
- **Dark & Light Mode** — Toggle between themes with full CSS variable support
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

## Tech Stack

- **React 19** (Vite)
- **Vanilla CSS** — 8px grid system, CSS custom properties, glassmorphism
- **localStorage** — Client-side persistence for workout history, gamification, and exercise logs
- **Wake Lock API** — Prevents screen lock during active workouts

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Program Structure

| Day       | Focus                    | Time Limit |
|-----------|--------------------------|------------|
| Tuesday   | Upper Body & Cardio      | 50 min     |
| Thursday  | Lower Body & HIIT        | 50 min     |
| Saturday  | Upper Body Heavy & Cardio| 60 min     |
| Sunday    | Lower Body Heavy & Cardio| 60 min     |

## License

MIT
