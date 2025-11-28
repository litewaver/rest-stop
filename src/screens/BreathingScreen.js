import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default function BreathingExercise({ navigation }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('Ready');
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;

  // Breathing cycle: Breathe In (4s) → Hold (4s) → Breathe Out (4s)
  useEffect(() => {
    if (!isActive) return;

    const breathingCycle = () => {
      // Breathe In - expand circle
      setPhase('Breathe In 🌸');
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1.8,
          duration: 4000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Hold
        setPhase('Hold 🤲');
        setTimeout(() => {
          // Breathe Out - shrink circle
          setPhase('Breathe Out 🍃');
          Animated.parallel([
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 4000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 4000,
              useNativeDriver: true,
            }),
          ]).start(() => {
            // Repeat cycle
            setTimeout(breathingCycle, 500);
          });
        }, 4000);
      });
    };

    breathingCycle();
  }, [isActive]);

  const handleStart = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setPhase('Get Ready...');
      setTimeout(() => setPhase('Breathe In 🌸'), 1000);
    } else {
      setPhase('Paused');
      scaleAnim.setValue(1);
      opacityAnim.setValue(0.3);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's practice calm breathing 😌...😮‍💨 </Text>
      <Text style={styles.instructions}>
        Follow the circle's rhythm 🌈
      </Text>

      {/* Breathing Circle */}
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{ scale: scaleAnim }],
              opacity: opacityAnim,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.innerCircle,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.phaseText}>{phase}</Text>
        </Animated.View>
      </View>

      {/* Controls */}
      <TouchableOpacity
        style={[styles.button, isActive && styles.buttonActive]}
        onPress={handleStart}
      >
        <Text style={styles.buttonText}>
          {isActive ? '⏸ Pause' : '▶️ Start Breathing'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate('SongScreen')}
      >
        <Text style={styles.doneButtonText}>Continue to Music 🎵</Text>
      </TouchableOpacity>

      <Text style={styles.tip}>
        Tip: Place your hand on your belly and feel it rise and fall 🌊
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
    fontFamily: 'Andika_400Regular',
  },
  instructions: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  circleContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  circle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#a8d8ea',
  },
  innerCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#7fc8f8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonActive: {
    backgroundColor: '#f39c12',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: '#9995bcff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tip: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});