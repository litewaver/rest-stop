import React from 'react';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';
import { View, ActivityIndicator } from 'react-native';

export default function FontLoader({ children }) {
  const [fontsLoaded] = useFonts({ Andika_400Regular });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}
