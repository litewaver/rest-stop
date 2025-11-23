import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';

export default function App() {
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#87b7ea' }]}>
      <Text style={styles.title}>Welcome to Safe Sounds</Text>

      <Image
        source={require('./assets/yoga1.png')}
        style={{ width: 250, height: 250 }}
      />

      <Button title="Start Meditating" onPress={() => {}} />

      <Text style={styles.andikaText}>
        Let's find our inner peace ☁️🌿🍃✨️ Tap "Start Meditating" to begin.
      </Text>
    </View>
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
