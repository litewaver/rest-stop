import React from 'react';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontLoader from './FontLoader'; // our new loader
import BreathingCircle from './BreathingCircle';


// Home screen
function HomePage({ navigation }) {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#cde5ffff' }]}>
      <Text style={styles.title}>Welcome to Safer Sounds</Text>
      <Image source={require('./assets/yoga1.png')} style={{ width: 250, height: 250 }} />
      <Button color={'#ecc87aff'}
        title="Start Meditating"
        onPress={() => navigation.navigate('MusicPlayer')}
        onPress1={() => alert("Let's Go!")}
      />
      <Button style={styles.Button}
        title="Home"
        onPress={() => navigation.navigate('HomeScreen')}
      />
      <Text style={styles.andikaText}>
        Let's find our inner peace ☁️🌿🍃✨️{"\n"}Press "Start Meditating" to begin.
      </Text>
      <BreathingCircle />
    </View>
  );
}

// Music player screen
function MusicPlayer() {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#d6e7ff' }]}>
      <Text style={styles.andikaText}>🎵 Play Music</Text>
      
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
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
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </FontLoader>
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
  Button: {
    marginTop: 20,
    color: '#f0be51ff',
      elevation: 5, // Android
  shadowColor: "#000", // iOS
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 4,
  },
});
