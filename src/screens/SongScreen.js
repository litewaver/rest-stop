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
    fact: "Did you know? 'Dance the Night Away' was released in 2018 and became one of Twice's biggest hits.",
  },
  {
    title: "4minute - Hot Issue",
    file: require("../../assets/songs/4minute-hot-issue.mp3"),
    image: require("../../assets/pic/bibimbap.jpg"),
    fact: "Fun Fact: 'Hot Issue' was 4minute's debut single released in 2009.",
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
];

export default function SongScreen() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  const fadeAnim = useRef(new Animated.Value(1)).current; // opacity animation

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

      // Fade in animation
      fadeAnim.setValue(0); // reset opacity
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
    } catch (error) {
      console.error("Error playing sound:", error);
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
      {/* Animated Box for Now Playing */}
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

        <ScrollView
          horizontal
          contentContainerStyle={{ paddingHorizontal: 10 }}
          style={{ marginBottom: 20 }}
        >
          {songs.map((song, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setCurrentSongIndex(index);
                setCurrentSong(song);
                setModalVisible(true);
              }}
            >
              <Image
                source={song.image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  marginRight: 10,
                  borderWidth: currentIndex === index ? 3 : 0,
                  borderColor: "#007AFF",
                }}
              />
            </Pressable>
          ))}
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  song: { fontSize: 18, marginBottom: 20 },
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
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
    shadowColor: "#5cb5bbff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    padding: 10,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
  },
  image: { width: "100%", height: 160, borderRadius: 8 },
  factContainer: { maxHeight: 180, marginTop: 10, width: "100%" },
  factText: { fontSize: 16, color: "#333" },
});
