import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from 'src/constants';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 28,
  },
  topHandle: {
    width: 48,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.handle,
    alignSelf: 'center',
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  albumArt: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  titleBlock: {
    flex: 1,
  },
  songTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: FONTS.title,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  songArtist: {
    marginTop: 4,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: FONTS.body,
  },
  headerActions: {
    marginLeft: 12,
  },
  headerButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lyricsContainer: {
    paddingTop: 12,
  },
  lineRow: {
    paddingVertical: 8,
    overflow: 'visible',
  },
  lineText: {
    fontSize: 20,
    color: COLORS.textMuted,
    fontFamily: FONTS.body,
    lineHeight: 30,
  },
  lineTextActive: {
    fontSize: 30,
    color: COLORS.white,
    fontWeight: '700',
    lineHeight: 38,
  },
  lineTextPast: {
    color: COLORS.textMutedPast,
  },
  progressBlock: {
    marginTop: 18,
  },
  progressTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.progressTrack,
    overflow: 'hidden',
  },
  progressFill: {
    height: 3,
    backgroundColor: COLORS.white,
  },
  progressTimes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  timeText: {
    color: COLORS.textSubtle,
    fontSize: 12,
    fontFamily: FONTS.body,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  controlButton: {
    width: 52,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  playButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.playButton,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconWrap: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
