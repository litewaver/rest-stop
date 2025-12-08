import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuizPlayer from './src/screens/QuizScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import SongScreen from './src/screens/SongScreen';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import { ActivityIndicator, View } from 'react-native';
import PomodoroScreen from './src/screens/PomodoroScreen';

// -------------------- Navigator --------------------

const Stack = createNativeStackNavigator();

export default function App() {
  // Move the hook INSIDE the component
  const [fontsLoaded] = useFonts({ Andika_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#433868ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'none' },
          headerTintColor: '#433868ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Use HomePortal as your main screen */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="QuizScreen" component={QuizPlayer} />
        <Stack.Screen name="BreathingScreen" component={BreathingScreen} />
        <Stack.Screen name="SongScreen" component={SongScreen} />
        <Stack.Screen name="PomodoroScreen" component={PomodoroScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}