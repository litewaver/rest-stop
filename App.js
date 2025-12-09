import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import your screens - fixed paths
import HomeScreen from './src/screens/HomeScreen';
import QuizPlayer from './src/screens/QuizScreen';
import BreathingScreen from './src/screens/BreathingScreen';
import SongScreen from './src/screens/SongScreen';
import PomodoroScreen from './src/screens/PomodoroScreen';
import StickerScreen from './src/screens/StickerScreen';
import StickerAlbum from './src/screens/StickerAlbum';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: 'none' },
          headerTintColor: '#433868ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="QuizScreen" component={QuizPlayer} />
        <Stack.Screen name="BreathingScreen" component={BreathingScreen} />
        <Stack.Screen name="SongScreen" component={SongScreen} options={{ title: "Your Songs" }}/>
        <Stack.Screen name="PomodoroScreen" component={PomodoroScreen} options={{ title: "Pomodoro Timer" }} />
        <Stack.Screen name="StickerScreen" component={StickerScreen} options={{ title: "Your Stickers" }}/>
         <Stack.Screen name="StickerAlbum" component={StickerAlbum} options={{ title: "Sticker Album" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}