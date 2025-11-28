import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function BreathingCircle() {
  const scale = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = useState('Inhale');

  const inhaleSound = useRef(new Audio.Sound());
  const exhaleSound = useRef(new Audio.Sound());

  // Load sounds
  useEffect(() => {
    const loadSounds = async () => {
      try {
        await inhaleSound.current.loadAsync(require('./assets/inhale.mp3'));
        await exhaleSound.current.loadAsync(require('./assets/exhale.mp3'));
      } catch (error) {
        console.log('Error loading sound', error);
      }
    };
    loadSounds();

    // Unload on cleanup
    return () => {
      inhaleSound.current.unloadAsync();
      exhaleSound.current.unloadAsync();
    };
  }, []);

  // Breathing animation loop
  useEffect(() => {
    const cycle = () => {
      // Inhale
      setPhase('Inhale');
      inhaleSound.current.replayAsync(); // play inhale sound
      Animated.timing(scale, {
        toValue: 2,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        // Exhale
        setPhase('Exhale');
        exhaleSound.current.replayAsync(); // play exhale sound
        Animated.timing(scale, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }).start(() => cycle()); // repeat
      });
    };

    cycle();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{phase} 🌬️</Text>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale }],
            backgroundColor: phase === 'Inhale' ? '#9b6ae6ff' : '#b5a2f2ff',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#070314',
    textAlign: 'center',
  },
});
