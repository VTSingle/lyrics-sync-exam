import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from 'src/assets/icons';
import { en } from 'src/locale';
import { formatTime } from 'src/utils';
import { styles } from 'src/screens/styles';

type LyricsFooterProps = {
  playbackMs: number;
  totalDuration: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
};

export const LyricsFooter = ({
  playbackMs,
  totalDuration,
  isPlaying,
  onTogglePlay,
}: LyricsFooterProps) => {
  const progress = totalDuration ? playbackMs / totalDuration : 0;

  return (
    <View>
      <View style={styles.progressBlock}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <View style={styles.progressTimes}>
          <Text style={styles.timeText}>{formatTime(playbackMs)}</Text>
          <Text style={styles.timeText}>
            -{formatTime(Math.max(totalDuration - playbackMs, 0))}
          </Text>
        </View>
      </View>

      <View style={styles.controlsRow}>
        <Pressable
          style={styles.controlButton}
          accessibilityRole="button"
          accessibilityLabel={en.controls.previous}
        >
          <SkipBackIcon />
        </Pressable>
        <Pressable
          style={styles.playButton}
          onPress={onTogglePlay}
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? en.controls.pause : en.controls.play}
        >
          <View style={styles.playIconWrap}>
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </View>
        </Pressable>
        <Pressable
          style={styles.controlButton}
          accessibilityRole="button"
          accessibilityLabel={en.controls.next}
        >
          <SkipForwardIcon />
        </Pressable>
      </View>
    </View>
  );
};
