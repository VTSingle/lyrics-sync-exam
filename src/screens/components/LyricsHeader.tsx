import React from 'react';
import { Image, Text, View } from 'react-native';
import { MoreIcon } from 'src/assets/icons';
import { styles } from 'src/screens/styles';

type LyricsHeaderProps = {
  coverUri?: string;
  title: string;
  artist: string;
};

export const LyricsHeader = ({ coverUri, title, artist }: LyricsHeaderProps) => (
  <View>
    <View style={styles.topHandle} />
    <View style={styles.headerRow}>
      <Image source={{ uri: coverUri }} style={styles.albumArt} />
      <View style={styles.titleBlock}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {artist}
        </Text>
      </View>
      <View style={styles.headerActions}>
        <View style={styles.headerButton}>
          <MoreIcon />
        </View>
      </View>
    </View>
  </View>
);
