# LyricsSync

Senior React Native test task: synchronized lyrics screen with live highlight, auto-scroll, and playback simulation.

## What’s implemented
- Apple Music–style lyrics screen with album header, synced lyrics, and footer controls.
- Real-time line highlighting based on timestamps from `src/data/song.json`.
- Auto-scroll keeps the active line centered with smooth timing-based animation.
- Tap-to-seek on any lyric line.
- Play/pause control for simulated playback.
- Performance tweaks: memoized line items, viewability tracking, and FlatList window tuning.
- SVG icons for player controls and menu actions.

## Project structure
- `App.tsx` — App entry point; renders the lyrics screen.
- `src/assets/` — Icons and other static assets.
  - `src/assets/icons/` — SVG icon components for player controls and menu.
- `src/constants/` — Design tokens (colors, fonts).
- `src/data/` — Sample song + lyric data (`song.json`).
- `src/hooks/` — Reusable hooks (e.g., playback timer).
- `src/locale/` — UI strings and accessibility text.
- `src/screens/` — Screen components, styles, and composed UI sections.
  - `src/screens/components/` — Header, list, and footer UI building blocks.
- `src/types/` — Shared TypeScript types.
- `src/utils/` — Helper functions (time formatting, math utilities).

## Notes
- Uses `react-native-reanimated` for scroll animation.
- `PLAYBACK_TICK_MS` controls how often playback time updates (lower = smoother, higher = lighter).

## Running the app
```sh
yarn install
yarn start
yarn ios # or yarn android
```

If you added dependencies recently, restart Metro and rebuild the app.

## Demo video
[Watch the demo video](https://drive.google.com/file/d/1VjFZSskuZ4kDyiQ5KVphxVlXOHwK4fYd/view?usp=drive_link)
