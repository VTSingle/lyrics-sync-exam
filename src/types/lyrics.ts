import { LayoutChangeEvent } from 'react-native';

export type LyricLine = {
  id: string;
  line: string;
  milliseconds: number;
  duration: number;
};

export type LineItemProps = {
  line: string;
  isActive: boolean;
  isPast: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress?: () => void;
};
