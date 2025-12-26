import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { COLORS } from 'src/constants';

const iconColor = COLORS.icon;

export const PlayIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 22 22" fill="none">
    <Path
      d="M6.5 4.8L17 11L6.5 17.2Z"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinejoin="round"
    />
  </Svg>
);

export const PauseIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 22 22" fill="none">
    <Path
      d="M7.5 5.5V16.5M14.5 5.5V16.5"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);

export const SkipBackIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 22 22" fill="none">
    <Path
      d="M6 6V16M18 7L11 11L18 15"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const SkipForwardIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 22 22" fill="none">
    <Path
      d="M16 6V16M4 7L11 11L4 15"
      stroke={iconColor}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export const MoreIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx={5} cy={10} r={1.6} fill={iconColor} />
    <Circle cx={10} cy={10} r={1.6} fill={iconColor} />
    <Circle cx={15} cy={10} r={1.6} fill={iconColor} />
  </Svg>
);
