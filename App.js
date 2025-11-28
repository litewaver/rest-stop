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
import QuizPlayer from './screens/QuizScreen';
import SongPlaylist from './screens/SongScreen';
// -------------------- Navigator --------------------
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#06121fff' },
          headerTintColor: '#433868ff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Use HomePortal as your main screen */}
        <Stack.Screen name="HomeScreen" component={HomePortal} />
        <Stack.Screen name="QuizScreen" component={QuizPlayer} />
        <Stack.Screen name="SongScreen" component={SongPlaylist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}