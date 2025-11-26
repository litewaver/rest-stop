import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontLoader from './FontLoader'; // your font loader
import BreathingCircle from './BreathingCircle';

// -------------------- Home Page --------------------
function HomePage({ navigation }) {
  return (
    <View style={[styles.container, { backgroundColor: '#cde5ffff', paddingTop: 50 }]}>
      <Text style={styles.title}>Welcome to Safer Sounds</Text>

      <Image source={require('./assets/yoga1.png')} style={styles.image} />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('MusicPlayer')}
      >
        <Text style={styles.customButtonText}>Start Meditating</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.popToTop()} // always goes to HomePage
      >
        <Text style={styles.customButtonText}>Home Page</Text>
      </TouchableOpacity>

      <Text style={styles.andikaText}>
        Let's find our inner peace ☁️🌿🍃✨️{"\n"}Press "Start Meditating" to begin.
      </Text>

      <BreathingCircle />
    </View>
  );
}

// -------------------- Music Player Screen --------------------
function MusicPlayer({ navigation }) {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#d6e7ff' }]}>
      <Text style={styles.andikaText}>🎵 Play Music</Text>

      <TouchableOpacity
        style={[styles.customButton, { marginTop: 30 }]}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.customButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

// -------------------- Navigator --------------------
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <FontLoader>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#87b7ea' },
            headerTintColor: '#070314',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen name="HomeScreen" component={HomePage} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontLoader>
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
    // Android shadow
    elevation: 5,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  customButtonText: {
    color: "#070314",
    fontSize: 18,
    fontWeight: "600",
  },
});
