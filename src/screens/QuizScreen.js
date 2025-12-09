import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import FancyGreeting from '../../AppGreeting';

// ✨ Sparkle Component
const Sparkle = ({ x, y, onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const moveAnims = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Animate sparkles appearing and spreading out
    Animated.parallel([
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      ...moveAnims.map((anim) =>
        Animated.timing(anim, {
          toValue: 30,
          duration: 600,
          useNativeDriver: true,
        })
      ),
    ]).start(() => onComplete());
  }, []);

  const sparkleEmojis = ['✨', '⭐', '💫', '🌟'];

  return (
    <View style={[styles.sparkleContainer, { left: x - 20, top: y - 20 }]}>
      {sparkleEmojis.map((emoji, index) => {
        const angle = (index * Math.PI * 2) / 4;
        const translateX = moveAnims[index].interpolate({
          inputRange: [0, 30],
          outputRange: [0, Math.cos(angle) * 30],
        });
        const translateY = moveAnims[index].interpolate({
          inputRange: [0, 30],
          outputRange: [0, Math.sin(angle) * 30],
        });

        return (
          <Animated.Text
            key={index}
            style={[
              styles.sparkleText,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateX },
                  { translateY },
                ],
              },
            ]}
          >
            {emoji}
          </Animated.Text>
        );
      })}
    </View>
  );
};

export default function QuizScreen({navigation}) {
  // Load font
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  const questions = [
    { 
      question: "How are you feeling today?", 
      choices: ["😊 Happy", "😢 Sad", "🤩 Excited", "😬 Nervous", "😡 Angry", "🤒 Sick"] 
    },
    { 
      question: "What type of music do you like right now?", 
      choices: ["🎤 Pop", "🎸 Rock", "🎻 Classical", "🎷 Jazz", "🎧 Hip-Hop"] 
    },
    { 
      question: "How old are you?", 
      choices: ["👶 2-4", "🧒 5-7", "🧑 8-10", "👦 11-13", "⭐ 14+"] 
    },
    {
      question: "Which of these helps you relax?",
      choices: [
        "Crying 😭",
        "Arguing 🗣️",
        "Overthinking 🤯",
        "Caffeine ☕",
        "Yelling 😤",
        "Playing 🤸‍♂️",
        "Drawing 🎨",
        "Listening to Music (good choice!)💃",
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [sparkles, setSparkles] = useState([]);

  // animated values for each choice button
  const shakeAnimations = useRef(
    questions.map(q => q.choices.map(() => new Animated.Value(0)))
  ).current;

  // Play haptic feedback when screen loads
  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, [currentQuestion]);

  // Wait for fonts to load
  if (!fontsLoaded) {
    return null;
  }

  // shake animation function
  const triggerShake = (questionIndex, choiceIndex) => {
    const anim = shakeAnimations[questionIndex][choiceIndex];

    anim.setValue(0);

    Animated.sequence([
      Animated.timing(anim, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: -5, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 5, duration: 100, useNativeDriver: true }),
      Animated.timing(anim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const handleChoice = async (choice, index, event) => {
    // HAPTIC FEEDBACK on button press
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // CREATE SPARKLES at touch location
    const { nativeEvent } = event;
    const sparkleId = Date.now();
    setSparkles(prev => [...prev, {
      id: sparkleId,
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    }]);
    
    triggerShake(currentQuestion, index);

    setFeedback(`You chose: ${choice}`);

    setTimeout(async () => {
      setFeedback("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete - SUCCESS HAPTIC & go to SongScreen
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setCurrentQuestion(0);
        navigation.navigate('SongScreen');
      }
    }, 500);
  };

  // Remove sparkle after animation completes
  const removeSparkle = (id) => {
    setSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground  
        source={require('../../assets/pic/meditative-figure-2.avif')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      
      {/* Render sparkles */}
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          x={sparkle.x}
          y={sparkle.y}
          onComplete={() => removeSparkle(sparkle.id)}
        />
      ))}
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <FancyGreeting />

        <Text style={[styles.question, { fontFamily: 'Andika_400Regular' }]}>
          {questions[currentQuestion].question}
        </Text>

        {/* Button Container with equal spacing */}
        <View style={styles.buttonContainer}>
          {questions[currentQuestion].choices.map((choice, index) => {
            const shakeValue = shakeAnimations[currentQuestion][index];

            return (
              <TouchableOpacity 
                key={index}
                style={styles.customButton}
                onPress={(e) => handleChoice(choice, index, e)}
                activeOpacity={0.7}
              >
                <Animated.Text
                  style={[
                    styles.choiceText,
                    { transform: [{ translateX: shakeValue }] }
                  ]}
                >
                  {choice}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5619daff',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  customButton: {
    backgroundColor: 'rgba(15, 5, 49, 0.94)',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(150, 85, 247, 0.3)',
  },
  choiceText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#ffd4d4ff',
    fontWeight: '600',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
    color: '#5619daff',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  sparkleContainer: {
    position: 'absolute',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  sparkleText: {
    position: 'absolute',
    fontSize: 24,
  },
});