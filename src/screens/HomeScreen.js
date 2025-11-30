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
      source={require('../../assets/pic/lakeimage.avif')} // Fixed: ../../ instead of ../
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <BlurView intensity={40} tint="light" style={styles.glassOverlay}>
          <Text style={styles.title}>Safer Sounds</Text>

          <View intensity={60} tint="light" style={styles.card}>
            <Image
              source={require('../../assets/pic/yoga1.png')}
              
              style={styles.image}
            />
          </View>

<View style={[styles.glassOverlay, styles.row]} intensity={10} tint="light">
  <TouchableOpacity
    style={[styles.customButton, { flex: 1, marginRight: 5 }]}
    onPress={() => navigation.navigate("QuizScreen")}
  >
    <Text style={styles.customButtonText}>Check In</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.customButton, { flex: 1, marginHorizontal: 5 }]}
    onPress={() => navigation.navigate("SongScreen")}
  >
    <Text style={styles.customButtonText}>Start Listening</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.customButton, { flex: 1, marginLeft: 5 }]}
    onPress={() => navigation.navigate("BreathingScreen")}
  >
    <Text style={styles.customButtonText}>Quick Start</Text>
  </TouchableOpacity>
</View>


          <BlurView intensity={60} tint="light" style={styles.card}>
            <Text style={styles.andikaText}>
              Let's find our inner peace! ☁️🌿🍃✨️{"\n"}Press any button.
            </Text>
          </BlurView>

          {/* Button to open popup */}
            <TouchableOpacity
              style={styles.glassOverlay}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.customButtonText}>ℹ️ Learn More</Text>
            </TouchableOpacity>
        </BlurView>
      </ScrollView>

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay} >
          <BlurView intensity={30} tint="light" style={styles.modalContent}>
            <Text style={styles.modalTitle}>Welcome! 🌟</Text>
            <Text style={styles.modalText}>
              Safer Sounds is your companion for relaxation and mindfulness.
              {"\n\n"}
              We created this to help those suffering, struggling, or simply exist better.
               {"\n\n"}This app is in it's beta stages, but we wanted
              to release this as soon as possible to help guide you towards greatness in little ways🌈🍃
            </Text>

            <TouchableOpacity style={styles.linkButton} onPress={openLink}>
              <Text style={styles.linkButtonText}>🔗 Donations appreciated! </Text>
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

export default HomeScreen;

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
    color: '#270c4bff',
    marginBottom: 20,
    textAlign: 'left',
  },
  andikaText: {
    fontFamily: 'Andika_400Regular',
    fontSize: 18,
    color: '#bc8888ff',
    textAlign: 'center',
  },
  image: { width: 250, height: 250, borderRadius: 20 },
  customButton: {
    backgroundColor: 'rgba(248, 227, 176, 0.94)',
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
  customButtonText: { color: '#140a35ff', fontSize: 18, fontWeight: '600' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(210, 158, 158, 0.5)',
  },
  modalContent: {
    width: '50%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#aa8509ff',
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
row: {
  flexDirection: "row",
  justifyContent: "space-around",
  width: "100%",
},
});