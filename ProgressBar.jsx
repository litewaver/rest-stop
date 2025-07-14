import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function ProgressBar({ progress, duration, onSlide }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{formatTime(progress)}</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={progress}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#ccc"
        thumbTintColor="#1EB1FC"
        onValueChange={onSlide}
      />

      <Text style={styles.label}>{formatTime(duration)}</Text>
    </View>
  );
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes < 10 ? '0' + minutes : minutes}:${secs < 10 ? '0' + secs : secs}`;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    width: 50,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
});
