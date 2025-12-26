import { useEffect, useState } from 'react';

type UsePlaybackTimerOptions = {
  totalDuration: number;
  tickMs: number;
};

type UsePlaybackTimerResult = {
  playbackMs: number;
  setPlaybackMs: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
};

export const usePlaybackTimer = ({
  totalDuration,
  tickMs,
}: UsePlaybackTimerOptions): UsePlaybackTimerResult => {
  const [playbackMs, setPlaybackMs] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!totalDuration) {
      return;
    }
    if (!isPlaying) {
      return;
    }
    const interval = setInterval(() => {
      setPlaybackMs((prev) => {
        const next = prev + tickMs;
        return next > totalDuration ? 0 : next;
      });
    }, tickMs);
    return () => clearInterval(interval);
  }, [isPlaying, tickMs, totalDuration]);

  return {
    playbackMs,
    setPlaybackMs,
    isPlaying,
    setIsPlaying,
  };
};
