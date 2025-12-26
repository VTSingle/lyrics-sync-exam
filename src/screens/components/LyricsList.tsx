import React, { memo, useCallback } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  ListRenderItemInfo,
  Pressable,
  Text,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  type AnimatedRef,
} from 'react-native-reanimated';
import { styles } from 'src/screens/styles';
import { LineItemProps, LyricLine } from 'src/types';
import { en } from 'src/locale';

type LyricsListProps = {
  lyrics: LyricLine[];
  activeIndex: number;
  listRef: AnimatedRef<FlatList<LyricLine>>;
  onLineLayout: (index: number, event: LayoutChangeEvent) => void;
  onLinePress: (milliseconds: number) => void;
  onViewableItemsChanged: (info: {
    viewableItems: Array<{ index: number | null }>;
  }) => void;
  viewabilityConfig: {
    itemVisiblePercentThreshold: number;
    minimumViewTime: number;
  };
  onListLayout: (event: LayoutChangeEvent) => void;
  contentPaddingBottom: number;
};

const LineItem = memo(
  ({ line, isActive, isPast, onLayout, onPress }: LineItemProps) => (
    <LineItemContent
      line={line}
      isActive={isActive}
      isPast={isPast}
      onLayout={onLayout}
      onPress={onPress}
    />
  ),
  (prev, next) =>
    prev.line === next.line &&
    prev.isActive === next.isActive &&
    prev.isPast === next.isPast,
);

const LineItemContent = ({
  line,
  isActive,
  isPast,
  onLayout,
  onPress,
}: LineItemProps) => {
  const animatedStyle = useAnimatedStyle(
    () => {
      const targetScaleY = isActive ? 1.06 : isPast ? 0.98 : 1;
      const targetOpacity = isActive ? 1 : isPast ? 0.28 : 0.55;
      return {
        transform: [{ scaleY: withTiming(targetScaleY, { duration: 260 }) }],
        opacity: withTiming(targetOpacity, { duration: 260 }),
      };
    },
    [isActive, isPast],
  );

  return (
    <Animated.View style={[styles.lineRow, animatedStyle]} onLayout={onLayout}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={en.a11y.seekToLyric(line)}
      >
        <Text
          style={[
            styles.lineText,
            isActive && styles.lineTextActive,
            isPast && styles.lineTextPast,
          ]}
        >
          {line}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export const LyricsList = ({
  lyrics,
  activeIndex,
  listRef,
  onLineLayout,
  onLinePress,
  onViewableItemsChanged,
  viewabilityConfig,
  onListLayout,
  contentPaddingBottom,
}: LyricsListProps) => {
  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<LyricLine>) => (
      <LineItem
        line={item.line}
        isActive={index === activeIndex}
        isPast={index < activeIndex}
        onLayout={(event) => onLineLayout(index, event)}
        onPress={() => onLinePress(item.milliseconds)}
      />
    ),
    [activeIndex, onLineLayout, onLinePress],
  );

  return (
    <Animated.FlatList
      ref={listRef}
      data={lyrics}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        styles.lyricsContainer,
        { paddingBottom: contentPaddingBottom },
      ]}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewabilityConfig}
      removeClippedSubviews
      initialNumToRender={12}
      maxToRenderPerBatch={12}
      windowSize={9}
      onLayout={onListLayout}
    />
  );
};
