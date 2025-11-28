import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';

// -------------------- Home Page --------------------
function HomePortal({ navigation }) {
  return (
    <ImageBackground
      source={require('../../assets/pic/background1.jpg')} // Fixed: ../../ instead of ../
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BlurView intensity={90} tint="light" style={styles.glassOverlay}>
          <Text style={styles.title}>Welcome to Safer Sounds</Text>

          <BlurView intensity={60} tint="light" style={styles.card}>
            <Image
              source={require('../../assets/pic/yoga1.png')} // Fixed: yoga1.png is in assets/, not assets/pic/
              style={styles.image}
            />
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.card}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => navigation.navigate('QuizScreen')}
            >
              <Text style={styles.customButtonText}>Start Meditating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.customButton, { marginTop: 10 }]}
              onPress={() => navigation.navigate('SongScreen')}
            >
              <Text style={styles.customButtonText}>Start Listening</Text>
            </TouchableOpacity>
          </BlurView>

          <BlurView intensity={60} tint="light" style={styles.card}>
            <Text style={styles.andikaText}>
              Let's find our inner peace! ☁️🌿🍃✨️{"\n"}Press "Start Meditating"
            </Text>
          </BlurView>
        </BlurView>
      </ScrollView>
    </ImageBackground>
  );
}

export default HomePortal;

// -------------------- Styles --------------------
const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  glassOverlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  card: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Andika_400Regular',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  andikaText: {
    fontFamily: 'Andika_400Regular',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  image: { width: 250, height: 250, borderRadius: 20 },
  customButton: {
    backgroundColor: 'rgba(236,200,122,0.8)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  customButtonText: { color: '#070314', fontSize: 18, fontWeight: '600' },
});