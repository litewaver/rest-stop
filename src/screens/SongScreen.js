import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
  Button,
  Modal,
  StyleSheet,
  ImageBackground,
  Animated,
} from "react-native";
import { Audio } from "expo-av";

const songs = [
  {
    title: "Twice - Dance the Night Away",
    file: require("../../assets/songs/twice-dance-the-night-away.mp3"),
    image: require("../../assets/pic/bibimbap.jpg"),
    fact: "Twice is one of the most popular Korean girl groups worldwide! Pictured is Bibimbap, a famous Korean rice dish with vegetables and protein.",
  },
  {
    title: "4minute - Hot Issue",
    file: require("../../assets/songs/4minute-hot-issue.mp3"),
    image: require("../../assets/pic/bibimbap.jpg"),
    fact: "This song is from 2009, it's a K-pop classic! Bibimbap is a traditional Korean dish meaning 'mixed rice'.",
  },
  {
    title: "Blond:ish - Sete",
    file: require("../../assets/songs/blondish-sete.mp3"),
    image: require("../../assets/pic/eurovision.jpg"),
    fact: "Interesting Fact: 'Sete' by Blond:ish is known for its deep house vibes.",
  },
  {
    title: "Go_A - Shum",
    file: require("../../assets/songs/go-a-shum.mp3"),
    image: require("../../assets/pic/eurovision.jpg"),
    fact: "'Shum' by Go_A represented Ukraine in Eurovision 2021.",
  },
  {
    title: "Madonna - Hung Up",
    file: require("../../assets/songs/madonna-hung-up.mp3"),
    image: require("../../assets/pic/madonna.jpg"),
    fact: "Madonna is often described as the 'Queen of Pop'!",
  },
  {
    title: "Papa Roach - Gravity",
    file: require("../../assets/songs/paparoach-gravity.mp3"),
    image: require("../../assets/pic/daisyrock1.webp"),
    fact: "Papa Roach uses the band to reach out to fans going through tough times.",
  },
  {
    title: "Royal Republic - Addictive",
    file: require("../../assets/songs/royal-republic-addictive.mp3"),
    image: require("../../assets/pic/royalrepublic.jpg"),
    fact: "Royal Republic is a Swedish rock band. Sweden is known for Surströmming, one of the world's smelliest foods!",
  },
  {
    title: "Rihanna - Umbrella",
    file: require("../../assets/songs/rihanna-umbrella.mp3"),
    image: require("../../assets/pic/barbados.png"),
    fact: "Barbados, Rihanna's home country, is a Caribbean island known for its beaches.",
  },
  {
    title: "THE BOHEMIANS - I Ride Genius Band Story",
    file: require("../../assets/songs/thebohemians-i-ride-genius-band-story.mp3"),
    image: require("../../assets/pic/bobatea.jpg"),
    fact: "Boba tea is a popular fruity drink that originated in Taiwan in the 1980s.",
  },
  {
    title: "Lykke Li - I Follow Rivers",
    file: require("../../assets/songs/lykkeli-i-follow-rivers.mp3"),
    image: require("../../assets/pic/minecraft.avif"),
    fact: "Minecraft, IKEA & Spotify are famous global brands from Sweden, Lykke Li's home country. Pictured here is "
  }

];

export default function SongScreen() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  async function playSong(index = currentIndex) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const newSound = new Audio.Sound();
      await newSound.loadAsync(songs[index].file);
      setSound(newSound);
      setCurrentIndex(index);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) handleNext();
      });

      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();

      await newSound.playAsync();
      setIsPlaying(true);

      setModalVisible(false);
      setCurrentSong(null);
      setCurrentSongIndex(null);
    } catch (err) {
      console.error("Error playing sound:", err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePlayPause() {
    if (!sound) {
      playSong(currentIndex);
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  async function handleStop() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  function handleNext() {
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(nextIndex);
  }

  function handlePrev() {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  }

  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return (
    <ImageBackground
      source={require("../../assets/pic/space.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View style={[styles.box, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Now Playing:</Text>
        <Text style={styles.song}>{songs[currentIndex].title}</Text>

        <View style={styles.controls}>
          <Button title="⏮ Prev" onPress={handlePrev} />
          <Button
            title={isPlaying ? "⏸ Pause" : "▶️ Play"}
            onPress={handlePlayPause}
          />
          <Button title="⏹ Stop" onPress={handleStop} />
          <Button title="⏭ Next" onPress={handleNext} />
        </View>

        <ScrollView style={{ width: "100%", flexGrow: 1 }}>
          <View style={styles.grid}>
            {songs.map((song, index) => (
              <Pressable
                key={index}
                style={styles.gridItem}
                onPress={() => {
                  setCurrentSongIndex(index);
                  setCurrentSong(song);
                  setModalVisible(true);
                }}
              >
                <Image
                  source={song.image}
                  style={[
                    styles.songImage,
                    {
                      borderWidth: currentIndex === index ? 3 : 0,
                      borderColor: "#007AFF",
                    },
                  ]}
                />
                <Text style={styles.songLabel}>{song.title}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            {currentSong && (
              <>
                <Image
                  source={currentSong.image}
                  style={styles.image}
                  resizeMode="cover"
                />

                <ScrollView style={styles.factContainer}>
                  <Text style={styles.factText}>{currentSong.fact}</Text>
                </ScrollView>

                <View style={styles.modalButtons}>
                  <Button
                    title={isLoading ? "Loading..." : "Play"}
                    onPress={() => playSong(currentSongIndex)}
                    disabled={isLoading}
                  />
                  <Button
                    title="Close"
                    onPress={() => setModalVisible(false)}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: "100%", height: "100%" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#fff" },
  song: { fontSize: 18, marginBottom: 20, color: "#fff" },

  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: "center",
  },

  box: {
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },

  gridItem: {
    width: "48%",
    marginBottom: 15,
    alignItems: "center",
  },

  songImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },

  songLabel: {
    marginTop: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContainer: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#e7d8d8ea",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },

  image: { width: "100%", height: 160, borderRadius: 8 },
  factContainer: { maxHeight: 180, marginTop: 10, width: "100%" },
  factText: { fontSize: 16, color: "#333" },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
  },
});
