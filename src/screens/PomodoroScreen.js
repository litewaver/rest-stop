import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const Star = ({ style }) => {
  const twinkle = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(twinkle, {
          toValue: 1,
          duration: 1000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(twinkle, {
          toValue: 0,
          duration: 1000 + Math.random() * 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = twinkle.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View
      style={[
        styles.star,
        style,
        { opacity }
      ]}
    />
  );
};

const Cloud = ({ style }) => (
  <View style={[styles.cloud, style]}>
    <View style={[styles.cloudPart, { width: 60, height: 30 }]} />
    <View style={[styles.cloudPart, { width: 45, height: 25, left: 40 }]} />
    <View style={[styles.cloudPart, { width: 35, height: 28, left: 30 }]} />
  </View>
);

export default function PomodoroScreen() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [stars, setStars] = useState([]);
  const [clouds, setClouds] = useState([]);

  const starAnimations = useRef([]).current;
  const cloudAnimations = useRef([]).current;

  useEffect(() => {
    // Initialize stars
    const newStars = Array.from({ length: 50 }, (_, i) => {
      const anim = new Animated.Value(0);
      starAnimations.push(anim);
      
      Animated.loop(
        Animated.timing(anim, {
          toValue: height,
          duration: 15000 + Math.random() * 10000,
          useNativeDriver: true,
        })
      ).start();

      return {
        id: i,
        x: Math.random() * width,
        size: Math.random() * 3 + 1,
        animation: anim,
      };
    });
    setStars(newStars);

    // Initialize clouds
    const newClouds = Array.from({ length: 5 }, (_, i) => {
      const anim = new Animated.Value(0);
      cloudAnimations.push(anim);
      
      Animated.loop(
        Animated.timing(anim, {
          toValue: width + 100,
          duration: 30000 + Math.random() * 20000,
          useNativeDriver: true,
        })
      ).start();

      return {
        id: i,
        y: Math.random() * (height * 0.4) + 50,
        animation: anim,
      };
    });
    setClouds(newClouds);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <LinearGradient
      colors={['#312e81', '#581c87', '#9d174d']}
      style={styles.container}
    >
      {/* Stars */}
      {stars.map((star, i) => (
        <Animated.View
          key={star.id}
          style={[
            styles.starContainer,
            {
              left: star.x,
              transform: [{ translateY: star.animation }],
            }
          ]}
        >
          <Star style={{ width: star.size, height: star.size }} />
        </Animated.View>
      ))}

      {/* Clouds */}
      {clouds.map((cloud, i) => (
        <Animated.View
          key={cloud.id}
          style={[
            styles.cloudContainer,
            {
              top: cloud.y,
              transform: [{ translateX: cloud.animation }],
            }
          ]}
        >
          <Cloud />
        </Animated.View>
      ))}

      {/* Moon */}
      <View style={styles.moon} />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Decorative sparkles */}
        <Text style={[styles.sparkle, { top: height * 0.2, left: width * 0.2 }]}>✨</Text>
        <Text style={[styles.sparkle, { top: height * 0.25, right: width * 0.2 }]}>⭐</Text>
        <Text style={[styles.sparkle, { bottom: height * 0.3, left: width * 0.25 }]}>🌟</Text>

        {/* Timer Card */}
        <View style={styles.card}>
          <Text style={styles.title}>Calm Time</Text>

          {/* Circular Progress */}
          <View style={styles.timerContainer}>
            <Svg width={260} height={260}>
              <Defs>
                <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <Stop offset="0%" stopColor="#fbbf24" />
                  <Stop offset="50%" stopColor="#f472b6" />
                  <Stop offset="100%" stopColor="#a78bfa" />
                </SvgLinearGradient>
              </Defs>
              <Circle
                cx="130"
                cy="130"
                r="120"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="8"
                fill="none"
              />
              <Circle
                cx="130"
                cy="130"
                r="120"
                stroke="url(#grad)"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                rotation="-90"
                origin="130, 130"
              />
            </Svg>
            <View style={styles.timerText}>
              <Text style={styles.time}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </Text>
              <Text style={styles.subtitle}>minutes left</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={toggleTimer}
              style={[styles.button, styles.playButton]}
            >
              <Text style={styles.buttonText}>{isActive ? '⏸' : '▶'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={resetTimer}
              style={[styles.button, styles.resetButton]}
            >
              <Text style={styles.buttonText}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Encouraging message */}
        <Text style={styles.message}>
          {isActive ? '🧘‍♀️ Breathe and relax...' : '✨ Ready to start?'}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  starContainer: {
    position: 'absolute',
  },
  star: {
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  cloudContainer: {
    position: 'absolute',
    left: -100,
  },
  cloud: {
    position: 'relative',
    width: 100,
    height: 40,
  },
  cloudPart: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
  },
  moon: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fef3c7',
    shadowColor: '#fef3c7',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  sparkle: {
    position: 'absolute',
    fontSize: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    padding: 40,
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  timerContainer: {
    width: 260,
    height: 260,
    marginBottom: 30,
  },
  timerText: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  playButton: {
    backgroundColor: '#a855f7',
  },
  resetButton: {
    backgroundColor: '#06b6d4',
  },
  buttonText: {
    fontSize: 32,
    color: 'white',
  },
  message: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
});