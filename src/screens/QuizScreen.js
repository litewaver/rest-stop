import React, { useState, useRef } from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Animated, ImageBackground } from 'react-native';
import FancyGreeting from '../../AppGreeting';

export default function QuizScreen({navigation}) {
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

  // ⭐ animated values for each choice button
  const shakeAnimations = useRef(
    questions.map(q => q.choices.map(() => new Animated.Value(0)))
  ).current;

  // ⭐ shake animation function
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

  const handleChoice = (choice, index) => {
    triggerShake(currentQuestion, index); // ⭐ trigger shake

    setFeedback(`You chose: ${choice}`);

    setTimeout(() => {
      setFeedback("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz complete - go to breathing exercise
        setCurrentQuestion(0);
        navigation.navigate('BreathingScreen');
      }
    }, 500);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <ImageBackground  
        source={require('../../assets/pic/meditative-figure-2.avif')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <FancyGreeting />

      {questions[currentQuestion].choices.map((choice, index) => {
        const shakeValue = shakeAnimations[currentQuestion][index];

        return (
          <TouchableOpacity 
            key={index}
            style={styles.customButton}
            onPress={() => handleChoice(choice, index)}
          >
            <Animated.Text
              style={[
                styles.choiceText,
                { transform: [{ translateX: shakeValue }] } // ⭐ apply shake
              ]}
            >
              {choice}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}

      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}

      <Text style={[styles.question, { fontFamily: 'Andika_400Regular' }]}>
        {questions[currentQuestion].question}
      </Text>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e1ccff',
    alignItems: 'center',
    justifyContent: 'flex-bottom',
    padding: 20,
    paddingTop: 40,
    
  },

  card: {

    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20, 
    elevation: 10,
    alignItems: 'center',
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5619daff',
    marginTop: 20,
    marginBottom: 30,
    
  },
  choiceButton: {
    backgroundColor: '#9995bcff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  choiceText: {
    fontSize: 22,
    textAlign: 'center',
    color: '#ffd4d4ff',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
    customButton: {
    backgroundColor: 'rgba(15, 5, 49, 0.94)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    flex: 1,
    justifyContent: "space-evenly", 
    padding: 15,
    }
});