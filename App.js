import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import QuizPlayer from '../safe-sounds-code/screens/QuizScreen';
import HomeScreen from '../safe-sounds-code/screens/HomeScreen';
import BreathingCircle from './BreathingCircle';

// -------------------- Home Page --------------------
function HomePage({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: '#cde5ffff', paddingTop: 50 }]}>
      <Text style={styles.title}>Welcome to Safer Sounds</Text>

      {/* Safe image check */}
      <Image
        source={require('./assets/yoga1.png')}
        style={styles.image}
        defaultSource={require('./assets/placeholder.png')} // optional placeholder
      />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('QuizScreen')}
      >
        <Text style={styles.customButtonText}>Start Meditating</Text>
      </TouchableOpacity>

      <Text style={styles.andikaText}>
        Let's find our inner peace ☁️🌿🍃✨️{"\n"}Press "Start Meditating" to begin.
      </Text>

      {/* Safe BreathingCircle rendering */}
      {BreathingCircle ? <BreathingCircle /> : <Text>Loading circle...</Text>}
    </View>
  );
}

// -------------------- Quiz Page --------------------
function QuizPage() {
  return QuizPlayer ? <QuizPlayer /> : <Text>Loading quiz...</Text>;
}

// -------------------- Navigator --------------------
const Stack = createNativeStackNavigator();

export default function App() {
  // -------------------- Load fonts safely --------------------
  const [fontsLoaded] = useFonts({ Andika_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#87b7ea" />
        <Text style={{ marginTop: 10 }}>Loading fonts...</Text>
      </View>
    );
  }

  // -------------------- Render Navigation --------------------
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#87b7ea' },
          headerTintColor: '#070314',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomePage} />
        <Stack.Screen name="QuizScreen" component={QuizPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  title: {
    fontFamily: 'Andika_400Regular',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070314',
    marginBottom: 20,
  },
  andikaText: {
    fontFamily: 'Andika_400Regular',
    fontSize: 18,
    color: '#070314',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: { width: 250, height: 250, alignSelf: 'center', marginBottom: 20 },
  customButton: {
    backgroundColor: "#ecc87aff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  customButtonText: { color: "#070314", fontSize: 18, fontWeight: "600" },
});
