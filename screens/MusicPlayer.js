import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MusicPlayer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎵 Play Music</Text>
      

      <View>
        songs.map((song, index) => (
          <Pressable key={index} style={styles.songItem} onPress={() => {/* Logic to play song */}}>
            <Image source={song.image} style={styles.songImage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f5d7ff',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
