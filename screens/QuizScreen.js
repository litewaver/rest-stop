import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';


export default function QuizPlayer() {
  const questions = [
    { question: "How are you feeling today?", choices: ["Happy", "Sad", "Excited", "Nervous", "Angry", "Sick"] },
    { question: "What type of music do you like right now?", choices: ["Pop", "Rock", "Classical", "Jazz", "Hip-Hop"] },
    { question: "How old are you?", choices: ["2-4", "5-7", "8-10", "11-13", "14+"] },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Load the font
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  if (!fontsLoaded) {
    return null; // or <AppLoading /> if using older Expo versions
  }

  const handleChoice = (choice) => {
    setFeedback(`You chose: ${choice}`);
    setTimeout(() => {
      setFeedback("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        alert("Quiz finished!");
        setCurrentQuestion(0); // reset quiz
      }
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.question, { fontFamily: 'Andika_400Regular' }]}>
        {questions[currentQuestion].question}
      </Text>
      {questions[currentQuestion].choices.map((choice, index) => (
        <TouchableOpacity
          key={index}
          style={styles.choiceButton}
          onPress={() => handleChoice(choice)}
        >
          <Text style={styles.choiceText}>{choice}</Text>
        </TouchableOpacity>
      ))}
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5d7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  question: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  choiceButton: {
    backgroundColor: '#9bd1a7',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
  },
  choiceText: {
    fontSize: 18,
    textAlign: 'center',
  },
  feedback: {
    marginTop: 20,
    fontSize: 18,
    fontStyle: 'italic',
  },
});
