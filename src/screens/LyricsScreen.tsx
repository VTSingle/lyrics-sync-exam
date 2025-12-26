import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ImageBackground,
  LayoutChangeEvent,
  StatusBar,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  LyricsFooter,
  LyricsHeader,
  LyricsList,
} from 'src/screens/components';
import { usePlaybackTimer } from 'src/hooks';
import { styles } from 'src/screens/styles';
import songData from 'src/data/song.json';
import { LyricLine } from 'src/types';
import { clamp } from 'src/utils';

const PLAYBACK_TICK_MS = 120;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const DEFAULT_LINE_HEIGHT = 30;

const LyricsScreen = ()=> {
  const listRef = useAnimatedRef<FlatList<LyricLine>>();
  const viewableIndicesRef = useRef(new Set<number>());
  const lineHeightsRef = useRef<number[]>([]);
  const averageLineHeightRef = useRef(DEFAULT_LINE_HEIGHT);
  const insets = useSafeAreaInsets();
  const targetOffset = useSharedValue(0);
  const lastTargetOffsetRef = useRef(0);
  const listHeightRef = useRef(0);

  const lyrics = useMemo<LyricLine[]>(() => {
    const lines = (songData.lrc || [])
      .filter((item) => item?.line && item.line.trim().length > 0)
      .map((item, index) => ({
        id: `${item._id?.$oid ?? index}`,
        line: item.line,
        milliseconds: item.milliseconds ?? 0,
        duration: item.duration ?? 0,
      }))
      .sort((a, b) => a.milliseconds - b.milliseconds);
    return lines;
  }, []);

  const totalDuration = useMemo(() => {
    if (!lyrics.length) {
      return 0;
    }
    const last = lyrics[lyrics.length - 1];
    return last.milliseconds + Math.max(last.duration, 1200);
  }, [lyrics]);

  const { playbackMs, setPlaybackMs, isPlaying, setIsPlaying } =
    usePlaybackTimer({
      totalDuration,
      tickMs: PLAYBACK_TICK_MS,
    });

  const activeIndex = useMemo(() => {
    if (!lyrics.length) {
      return 0;
    }
    let low = 0;
    let high = lyrics.length - 1;
    let result = 0;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (lyrics[mid].milliseconds <= playbackMs) {
        result = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return result;
  }, [lyrics, playbackMs]);

  const handleLineLayout = useCallback(
    (index: number, event: LayoutChangeEvent) => {
      const height = event.nativeEvent.layout.height;
      const prev = lineHeightsRef.current[index];
      if (prev === height) {
        return;
      }
      lineHeightsRef.current[index] = height;
      const knownHeights = lineHeightsRef.current.filter(Boolean);
      if (knownHeights.length) {
        const sum = knownHeights.reduce((acc, value) => acc + value, 0);
        averageLineHeightRef.current = sum / knownHeights.length;
      }
    },
    [],
  );

  const getOffsetForIndex = useCallback((index: number) => {
    let offset = 0;
    for (let i = 0; i < index; i += 1) {
      offset +=
        lineHeightsRef.current[i] ?? averageLineHeightRef.current;
    }
    return offset;
  }, []);

  const handleListLayout = useCallback((event: LayoutChangeEvent) => {
    listHeightRef.current = event.nativeEvent.layout.height;
  }, []);

  const getEstimatedContentHeight = useCallback(
    (count: number) => {
      const known = lineHeightsRef.current.filter(Boolean);
      const knownSum = known.reduce((acc, value) => acc + value, 0);
      const unknownCount = Math.max(0, count - known.length);
      return knownSum + unknownCount * averageLineHeightRef.current;
    },
    [],
  );

  useEffect(() => {
    if (!lyrics.length) {
      return;
    }
    if (!listHeightRef.current) {
      return;
    }
    const lineHeight =
      lineHeightsRef.current[activeIndex] ??
      averageLineHeightRef.current;
    const offset = getOffsetForIndex(activeIndex);
    const centeredOffset =
      offset - listHeightRef.current / 2 + lineHeight / 2;
    const maxOffset = Math.max(
      0,
      getEstimatedContentHeight(lyrics.length) - listHeightRef.current,
    );
    const nextOffset = clamp(centeredOffset, 0, maxOffset);
    if (Math.abs(lastTargetOffsetRef.current - nextOffset) < 1) {
      return;
    }
    lastTargetOffsetRef.current = nextOffset;
    targetOffset.value = withTiming(nextOffset, { duration: 320 });
  }, [
    activeIndex,
    getEstimatedContentHeight,
    getOffsetForIndex,
    lyrics.length,
    targetOffset,
  ]);
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
      const next = new Set<number>();
      viewableItems.forEach((item) => {
        if (item.index !== null) {
          next.add(item.index);
        }
      });
      viewableIndicesRef.current = next;
    },
  );

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
    minimumViewTime: 120,
  });

  useDerivedValue(() => {
    scrollTo(listRef, 0, targetOffset.value, false);
  }, [targetOffset]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: songData.album?.cover_xl || songData.album?.cover }}
        style={styles.background}
        resizeMode="cover"
        blurRadius={28}
      >
        <View style={styles.backgroundOverlay} />
      </ImageBackground>
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.container,
            { paddingBottom: Math.max(insets.bottom, 18) },
          ]}
        >
          <LyricsHeader
            coverUri={songData.album?.cover}
            title={songData.title}
            artist={songData.artist?.name}
          />

          <LyricsList
            lyrics={lyrics}
            activeIndex={activeIndex}
            listRef={listRef}
            onLineLayout={handleLineLayout}
            onLinePress={setPlaybackMs}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
            onListLayout={handleListLayout}
            contentPaddingBottom={WINDOW_HEIGHT * 0.08}
          />

          <LyricsFooter
            playbackMs={playbackMs}
            totalDuration={totalDuration}
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((prev) => !prev)}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default LyricsScreen;
