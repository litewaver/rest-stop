import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Your current HomeScreen as a function
function HomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

if (!fontsLoaded) return <Text>Loading...</Text>;


  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#87b7ea' }]}>
      <Text style={styles.title}>Welcome to Safe Sounds</Text>
      <Image
        source={require('./assets/yoga1.png')}
        style={{ width: 250, height: 250 }}
      />
      <Button
        title="Start Meditating"
        onPress={() => navigation.navigate('MusicPlayer')}
      />
      <Text style={styles.andikaText}>
        Let's find our inner peace. ☁️🌿🍃✨️ Tap "Start Meditating" to begin.
      </Text>
    </View>
  );
}

// Simple placeholder MusicPlayer screen
function MusicPlayer() {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#d6e7ff' }]}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>🎵 Music Player Screen</Text>
    </View>
  );
}

// Create the stack navigator
const Stack = createNativeStackNavigator();

// Wrap everything inside NavigationContainer
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#87b7ea' },
          headerTintColor: '#0e0528ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  title: {
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
});
