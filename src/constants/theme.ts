import { Platform } from 'react-native';

export const COLORS = {
  background: '#0b0b0b',
  overlay: 'rgba(10, 10, 10, 0.72)',
  white: '#ffffff',
  textPrimary: '#f5f5f5',
  textSecondary: 'rgba(255,255,255,0.6)',
  textMuted: 'rgba(255,255,255,0.42)',
  textMutedPast: 'rgba(255,255,255,0.28)',
  textSubtle: 'rgba(255,255,255,0.5)',
  handle: 'rgba(255,255,255,0.25)',
  buttonBg: 'rgba(255,255,255,0.15)',
  progressTrack: 'rgba(255,255,255,0.2)',
  playButton: 'rgba(255,255,255,0.2)',
  icon: 'rgba(255,255,255,0.85)',
};

export const FONTS = {
  title: Platform.select({
    ios: 'Avenir Next',
    android: 'serif',
    default: 'System',
  }),
  body: Platform.select({
    ios: 'Avenir Next',
    android: 'serif',
    default: 'System',
  }),
};
