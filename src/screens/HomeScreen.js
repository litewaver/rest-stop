import React, { useState } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, Modal, View, Linking } from 'react-native';
import { BlurView } from 'expo-blur';

// -------------------- Home Page --------------------
function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  const openLink = () => {
    Linking.openURL('https://www.paypal.com/paypalme/valkyrr'); 
  };

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
              source={require('../../assets/pic/yoga1.png')} // Fixed: yoga1.png is actually in assets/pic/
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

          {/* Button to open popup */}
          <BlurView intensity={60} tint="light" style={styles.card}>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.customButtonText}>ℹ️ Learn More</Text>
            </TouchableOpacity>
          </BlurView>
        </BlurView>
      </ScrollView>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <BlurView intensity={80} tint="light" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Welcome! 🌟</Text>
            <Text style={styles.modalText}>
              Safer Sounds is your companion for relaxation and mindfulness.
              {"\n\n"}
              Dive into calming breathing exercises and soothing music to help
              you unwind and find your inner peace. {"\n\n"}This app is in it's beta stages, but we wanted
              to release this as soon as possible to help guide you towards greatness🌈🍃
            </Text>

            <TouchableOpacity style={styles.linkButton} onPress={openLink}>
              <Text style={styles.linkButtonText}>🔗 Donations appreciated!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </BlurView>
        </View>
      </Modal>
    </ImageBackground>
  );
}


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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#433868ff',
    marginBottom: 15,
    fontFamily: 'Andika_400Regular',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Andika_400Regular',
  },
  linkButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#9995bcff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});