import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import QuizPlayer from '../safe-sounds-code/screens/QuizScreen';
import BreathingCircle from '../safe-sounds-code/BreathingCircle';
import { BlurView } from 'expo-blur';

// -------------------- Home Page --------------------
function HomePortal({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/pic/background1.jpg')} // background image
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Glass overlay */}
        <BlurView intensity={90} tint="light" style={styles.glassOverlay}>
          <Text style={styles.title}>Welcome to Safer Sounds</Text>

          <Image source={require('../assets/yoga1.png')} style={styles.image} />

          <TouchableOpacity
            style={styles.customButton}
            onPress={() => navigation.navigate('QuizScreen')}
          >
            <Text style={styles.customButtonText}>Start Meditating</Text>
          </TouchableOpacity>

          <Text style={styles.andikaText}>
            Let's find our inner peace! ☁️🌿🍃✨️{"\n"}Press "Start Meditating"
          </Text>

          {BreathingCircle ? <BreathingCircle /> : <Text>Loading circle...</Text>}
        </BlurView>
      </ScrollView>
    </ImageBackground>
  );
}

// -------------------- Quiz Page --------------------
function QuizPage() {
  return QuizPlayer ? <QuizPlayer /> : <Text>Loading quiz...</Text>;
}

// -------------------- Navigator --------------------
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({ Andika_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#87b7ea" />
        <Text style={{ marginTop: 10 }}>Loading fonts...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#87b7ea' },
          headerTintColor: '#070314',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Use HomePortal as your main screen */}
        <Stack.Screen name="HomeScreen" component={HomePortal} />
        <Stack.Screen name="QuizScreen" component={QuizPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Andika_400Regular',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  andikaText: {
    fontFamily: 'Andika_400Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  image: { width: 250, height: 250, borderRadius: 20, marginBottom: 20 },
  customButton: {
    backgroundColor: 'rgba(236,200,122,0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  customButtonText: { color: '#070314', fontSize: 18, fontWeight: '600' },
});
