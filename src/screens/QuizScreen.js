import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export default function QuizPlayer() {
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
        "Playing🤸‍♂️",
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
        alert("yay!");
        setCurrentQuestion(0);
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { fontFamily: 'Andika_400Regular' }]}>
        {questions[currentQuestion].question}
      </Text>

      {questions[currentQuestion].choices.map((choice, index) => {
        const shakeValue = shakeAnimations[currentQuestion][index];

        return (
          <TouchableOpacity
            key={index}
            style={styles.choiceButton}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2e1ccff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
  },
  question: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#df829eff',
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
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
});