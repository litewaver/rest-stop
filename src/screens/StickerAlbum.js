import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StickerAlbum({ navigation }) {
  const [stickers, setStickers] = useState([]);

  // Load saved stickers from AsyncStorage
  const loadStickers = async () => {
    try {
      const stored = await AsyncStorage.getItem("myStickers");
      const parsed = stored ? JSON.parse(stored) : [];
      setStickers(parsed);
    } catch (e) {
      console.warn("Failed to load stickers:", e);
      setStickers([]);
    }
  };

  useEffect(() => {
    // Load stickers when component mounts
    loadStickers();

    // Reload when screen comes into focus
    const unsubscribe = navigation.addListener("focus", () => {
      loadStickers();
    });

    // Cleanup listener on unmount
    return () => {
      unsubscribe();
    };
  }, [navigation]);

  // Separate stickers by rarity
  const commonStickers = stickers.filter((s) => s.rarity === "Common");
  const rareStickers = stickers.filter((s) => s.rarity === "Rare");

  const renderSticker = ({ item }) => (
    <View style={styles.stickerBox}>
      {item.img && <Image source={item.img} style={styles.stickerImage} />}
      <Text style={styles.stickerName}>{item.name}</Text>
      <Text style={styles.stickerRarity}>{item.rarity}</Text>
    </View>
  );

  const renderEmptyState = (text) => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>My Sticker Album 📘</Text>

      {stickers.length === 0 ? (
        <View style={styles.noStickersContainer}>
          <Text style={styles.noStickersText}>
            No stickers yet! 🌸
            {"\n\n"}
            Complete 1 minute of breathing exercises to earn your first sticker!
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.category}>Common Stickers ({commonStickers.length})</Text>
          {commonStickers.length > 0 ? (
            <FlatList
              horizontal
              data={commonStickers}
              renderItem={renderSticker}
              keyExtractor={(item, index) => item.name + index}
              showsHorizontalScrollIndicator={false}
              style={styles.stickerList}
            />
          ) : (
            renderEmptyState("No common stickers yet")
          )}

          <Text style={styles.category}>Rare Stickers ({rareStickers.length})</Text>
          {rareStickers.length > 0 ? (
            <FlatList
              horizontal
              data={rareStickers}
              renderItem={renderSticker}
              keyExtractor={(item, index) => item.name + index}
              showsHorizontalScrollIndicator={false}
              style={styles.stickerList}
            />
          ) : (
            renderEmptyState("No rare stickers yet")
          )}
        </>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>⬅ Back to Breathing</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#e8f4f8" 
  },
  contentContainer: {
    padding: 20, 
    alignItems: "center",
    paddingBottom: 40,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: "center",
  },
  category: { 
    fontSize: 20, 
    fontWeight: "600", 
    marginTop: 15, 
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  stickerList: {
    marginBottom: 10,
  },
  stickerBox: { 
    width: 120, 
    height: 160, 
    backgroundColor: "#fff", 
    borderRadius: 15, 
    marginRight: 15, 
    alignItems: "center", 
    justifyContent: "center", 
    padding: 5, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3 
  },
  stickerImage: { 
    width: 80, 
    height: 80, 
    marginBottom: 10,
    resizeMode: "contain",
  },
  stickerName: { 
    fontSize: 14, 
    fontWeight: "600", 
    textAlign: "center" 
  },
  stickerRarity: { 
    fontSize: 12, 
    color: "#888", 
    textAlign: "center" 
  },
  emptyState: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
  noStickersContainer: {
    marginTop: 50,
    padding: 30,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noStickersText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    lineHeight: 28,
  },
  backButton: { 
    marginTop: 30, 
    backgroundColor: "#4a90e2", 
    paddingVertical: 12, 
    paddingHorizontal: 25, 
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backText: { 
    color: "#fff", 
    fontSize: 16,
    fontWeight: "600",
  },
});