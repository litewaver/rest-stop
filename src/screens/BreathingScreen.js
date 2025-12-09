import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Conditionally import ConfettiCannon
let ConfettiCannon = null;
try {
  ConfettiCannon = require("react-native-confetti-cannon").default;
} catch (e) {
  console.warn("ConfettiCannon not installed, skipping confetti.");
}

export default function BreathingExercise({ navigation }) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [earnedSticker, setEarnedSticker] = useState(null);
  const [confetti, setConfetti] = useState(false);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.3)).current;
  const sessionTimer = useRef(null);

  // ------------------------------ //
  // Stickers (paths must exist!)
  // ------------------------------ //
  const STICKERS = [
    { name: "Nintendo Switch", rarity: "Common", img: require("../../assets/stickers/handheld-game.png") },
    { name: "Pirate", rarity: "Common", img: require("../../assets/stickers/pirate.png") },
    { name: "Candy", rarity: "Common", img: require("../../assets/stickers/sweets.png") },
    { name: "Vampire", rarity: "Rare", img: require("../../assets/stickers/dracula.png") },
    { name: "Chef", rarity: "Rare", img: require("../../assets/stickers/yogachef.png") },
  ];

  const RARITY_ROLL = [
    { rarity: "Common", chance: 80 },
    { rarity: "Rare", chance: 20 },
  ];

  const getRandomSticker = () => {
    const roll = Math.random() * 100;
    let raritySelected = "Common";
    let total = 0;
    for (let entry of RARITY_ROLL) {
      total += entry.chance;
      if (roll <= total) {
        raritySelected = entry.rarity;
        break;
      }
    }
    const filtered = STICKERS.filter((s) => s.rarity === raritySelected);
    const chosen = filtered[Math.floor(Math.random() * filtered.length)];
    return chosen;
  };

  // ------------------------------- //
  // Daily sticker limit
  // ------------------------------- //
  const checkDailyLimit = async () => {
    const today = new Date().toISOString().split("T")[0];
    let stored = {};
    try {
      stored = JSON.parse(await AsyncStorage.getItem("stickerDaily")) || {};
    } catch (e) {
      stored = {};
    }
    if (stored.date !== today) {
      await AsyncStorage.setItem("stickerDaily", JSON.stringify({ date: today, count: 0 }));
      return 0;
    }
    return stored.count || 0;
  };

  const incrementDailyLimit = async () => {
    const today = new Date().toISOString().split("T")[0];
    let stored = {};
    try {
      stored = JSON.parse(await AsyncStorage.getItem("stickerDaily")) || {};
    } catch (e) {
      stored = {};
    }
    const updated = { date: today, count: (stored.count || 0) + 1 };
    await AsyncStorage.setItem("stickerDaily", JSON.stringify(updated));
  };

  // ------------------------------- //
  // Save sticker to album
  // ------------------------------- //
  const saveSticker = async (sticker) => {
    let stored = [];
    try {
      stored = JSON.parse(await AsyncStorage.getItem("myStickers")) || [];
    } catch (e) {
      stored = [];
    }
    stored.push(sticker);
    await AsyncStorage.setItem("myStickers", JSON.stringify(stored));
  };

  // ------------------------------- //
  // Breathing animation cycle
  // ------------------------------- //
  useEffect(() => {
    if (!isActive) return;

    const breathingCycle = () => {
      setPhase("Breathe In 🌸");
      Animated.parallel([
        Animated.timing(scaleAnim, { toValue: 1.8, duration: 4000, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
      ]).start(() => {
        setPhase("Hold 🤲");
        setTimeout(() => {
          setPhase("Breathe Out 🍃");
          Animated.parallel([
            Animated.timing(scaleAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
            Animated.timing(opacityAnim, { toValue: 0.3, duration: 4000, useNativeDriver: true }),
          ]).start(() => setTimeout(breathingCycle, 500));
        }, 4000);
      });
    };

    breathingCycle();
  }, [isActive]);

  // ------------------------------- //
  // Start/pause breathing + 1-min timer
  // ------------------------------- //
  const handleStart = () => {
    setIsActive(!isActive);

    if (!isActive) {
      setPhase("Get Ready...");
      setTimeout(() => setPhase("Breathe In 🌸"), 1000);

      sessionTimer.current = setTimeout(async () => {
        const count = await checkDailyLimit();
        if (count >= 3) return;

        const sticker = getRandomSticker();
        await saveSticker(sticker);
        await incrementDailyLimit();

        setEarnedSticker(sticker);
        if (ConfettiCannon) setConfetti(true);
        setShowStickerModal(true);

        setTimeout(() => setConfetti(false), 3000);
      }, 60000); // 1 minute
    } else {
      clearTimeout(sessionTimer.current);
      setPhase("Paused");
    }
  };

  return (
    <View style={styles.container}>
      {confetti && ConfettiCannon && <ConfettiCannon count={100} origin={{ x: 200, y: -20 }} />}

      <Text style={styles.title}>Breathing Time 😌</Text>

      <View style={styles.circleContainer}>
        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }], opacity: opacityAnim }]} />
        <View style={styles.innerCircle}>
          <Text style={styles.phaseText}>{phase}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, isActive && styles.buttonActive]} onPress={handleStart}>
        <Text style={styles.buttonText}>{isActive ? "⏸ Pause" : "▶ Start"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.albumButton} onPress={() => navigation.navigate("StickerAlbum")}>
        <Text style={styles.albumText}>Open Sticker Album 📘</Text>
      </TouchableOpacity>

      {/* Sticker Modal */}
      <Modal visible={showStickerModal} transparent animationType="slide">
        <View style={styles.modalWrapper}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>You earned a sticker! 🎉</Text>
            {earnedSticker?.img && <Image source={earnedSticker.img} style={styles.stickerImage} />}
            <Text style={styles.stickerName}>{earnedSticker?.name}</Text>
            <Text style={styles.stickerRarity}>{earnedSticker?.rarity}</Text>

            <TouchableOpacity style={styles.closeButton} onPress={() => setShowStickerModal(false)}>
              <Text style={styles.closeText}>Yay! 🎀</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#e8f4f8" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 30 },
  circleContainer: { width: 250, height: 250, justifyContent: "center", alignItems: "center" },
  circle: { position: "absolute", width: 200, height: 200, borderRadius: 100, backgroundColor: "#a8d8ea" },
  innerCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: "#7fc8f8", alignItems: "center", justifyContent: "center" },
  phaseText: { fontSize: 22, color: "#fff", fontWeight: "bold" },
  button: { backgroundColor: "#4a90e2", paddingVertical: 14, paddingHorizontal: 35, borderRadius: 22, marginTop: 30 },
  buttonActive: { backgroundColor: "#f39c12" },
  buttonText: { color: "#fff", fontSize: 18 },
  albumButton: { marginTop: 20 },
  albumText: { fontSize: 16, color: "#4a90e2" },
  modalWrapper: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalBox: { width: 280, backgroundColor: "#fff", padding: 20, borderRadius: 20, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  stickerImage: { width: 120, height: 120, marginBottom: 10 },
  stickerName: { fontSize: 18, fontWeight: "600" },
  stickerRarity: { fontSize: 16, color: "#888", marginBottom: 20 },
  closeButton: { backgroundColor: "#4a90e2", paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 },
  closeText: { color: "#fff", fontSize: 16 },
});
