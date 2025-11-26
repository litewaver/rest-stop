import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomePage({ navigation }) {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#cde5ffff' }]}>
      <Text style={styles.title}>Welcome to Safer Sounds</Text>
      <Image source={require('./assets/yoga1.png')} style={{ width: 250, height: 250 }} />

      <Button
        color={'#ecc87aff'}
        title="Start Meditating"
        onPress={() => navigation.navigate('MusicPlayer')}
      />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('HomeScreen')} // navigates to itself
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


function MusicPlayer() {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#f9e192ff' }]}>
      <Text style={{ fontSize: 22, fontWeight: 'bold' }}>🎵 Music Player Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#b2d3f7ff' },
          headerTintColor: '#060114ff',
          headerTitleStyle: { fontWeight: 'bold' },
          
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MusicPlayer" component={MusicPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
});
