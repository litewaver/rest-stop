import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MusicPlayer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🎵 Music Playerr</Text>
      
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
