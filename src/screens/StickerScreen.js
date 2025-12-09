import React, { useState, useRef } from 'react';
import { View, Text, Image, Modal, Pressable, Animated, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StickerScreen({ navigation }) {
  // ✅ All hooks INSIDE the component
  const [unlockedSticker, setUnlockedSticker] = useState(null);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const popupScale = useRef(new Animated.Value(0)).current;

  const stickers = {
    oneMinute: [
      { id: "yogachef", image: require("../../assets/stickers/yogachef.png") },
      { id: "yogabear", image: require("../../assets/stickers/yogabear.png") },
      { id: "dracula", image: require("../../assets/stickers/dracula.png") },
      { id: "handheldgame", image: require("../../assets/stickers/handheld-game.png") },
    ],

    twoMinutes: [
      { id: "education", image: require("../../assets/stickers/education.png") },
      { id: "graduation", image: require("../../assets/stickers/graduation.png") },
      { id: "monkey1", image: require("../../assets/stickers/monkey1.png") },
      { id: "pirate", image: require("../../assets/stickers/pirate.png") },
    ],

    threeMinutes: [
      { id: "coding", image: require("../../assets/stickers/coding.png") },
      { id: "breathe", image: require("../../assets/stickers/breathe.png") },
      { id: "sweets", image: require("../../assets/stickers/sweets.png") },
      { id: "meditation2", image: require("../../assets/stickers/meditation2.png") },
    ],
  };

  const getRandomNonDuplicateSticker = (pool, unlocked) => {
    const available = pool.filter(
      (sticker) => !unlocked.some((s) => s.id === sticker.id)
    );

    if (available.length === 0) {
      return pool[Math.floor(Math.random() * pool.length)];
    }

    return available[Math.floor(Math.random() * available.length)];
  };

  const saveSticker = async (sticker) => {
    try {
      const stored = await AsyncStorage.getItem("unlockedStickers");
      const unlocked = stored ? JSON.parse(stored) : [];
      
      unlocked.push(sticker);
      
      await AsyncStorage.setItem("unlockedStickers", JSON.stringify(unlocked));
    } catch (error) {
      console.error("Error saving sticker:", error);
    }
  };

  const unlockSticker = async (minutes) => {
    let pool = null;

    if (minutes >= 3) {
      pool = stickers.threeMinutes;
    } else if (minutes >= 2) {
      pool = stickers.twoMinutes;
    } else if (minutes >= 1) {
      pool = stickers.oneMinute;
    }

    if (!pool) return;

    try {
      const stored = await AsyncStorage.getItem("unlockedStickers");
      const unlocked = stored ? JSON.parse(stored) : [];

      const randomSticker = getRandomNonDuplicateSticker(pool, unlocked);
      setUnlockedSticker(randomSticker);

      await saveSticker(randomSticker);

      popupScale.setValue(0);
      setShowStickerModal(true);
      Animated.spring(popupScale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error("Error unlocking sticker:", error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Your Stickers 🎨</Text>
      
      <Text style={styles.subtitle}>
        Earn stickers by completing breathing exercises!
      </Text>

      {/* You can add sticker display logic here */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          ⏱️ 1 minute = Common stickers{"\n"}
          ⏱️ 2 minutes = Uncommon stickers{"\n"}
          ⏱️ 3 minutes = Rare stickers
        </Text>
      </View>

      {/* Modal */}
      <Modal visible={showStickerModal} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Animated.View style={[styles.popup, { transform: [{ scale: popupScale }] }]}>
            
            <Text style={styles.unlockedText}>
              You earned a Sticker ✨
            </Text>

            {unlockedSticker && (
              <Image
                source={unlockedSticker.image}
                style={styles.unlockedSticker}
              />
            )}

            <Pressable style={styles.okButton} onPress={() => setShowStickerModal(false)}>
              <Text style={styles.okText}>Nice!</Text>
            </Pressable>

          </Animated.View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 28,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  popup: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  unlockedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  unlockedSticker: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  okButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  okText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});