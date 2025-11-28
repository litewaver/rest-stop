import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur'; // or @react-native-community/blur

export default function GlassScreen() {
  return (
    <ImageBackground
      source={require('../assets/pic/background1.jpg')} // ⭐ Also missing closing quote
      style={styles.background} // ⭐ Change "styles" to "style"
    >
      {/* Full-screen glass overlay */}
      <BlurView intensity={80} tint="light" style={styles.glassOverlay}> {/* ⭐ Change "styles" to "style" */}
      </BlurView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  glassOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent glass
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0a031dff',
    marginBottom: 40,
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#1a0320ff',
    fontSize: 18,
  },
});
 