import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { Audio } from "expo-audio"; // ⭐ NEW PACKAGE

// Song list
const songs = [
  {
    title: "Twice - Dance the Night Away",
    file: require("../../assets/songs/twice-dance-the-night-away.mp3"),
    image: require("../../assets/pic/bibimbap.jpg"),
  },
  {
    title: "4minute - Hot Issue",
    file: require("../../assets/songs/4minute-hot-issue.mp3"),
    image: require("../../assets/pic/bibimbap.jpg"),
  },
];

export default function SongScreen() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Play new song
  async function playSong(index = currentIndex) {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // Stop old sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      console.log("Loading:", songs[index].title);

      // ⭐ NEW expo-audio syntax
      const newSound = new Audio.Sound();
      await newSound.loadAsync(songs[index].file);

      setSound(newSound);
      setCurrentIndex(index);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) handleNext();
      });

      console.log("Playing:", songs[index].title);
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error playing sound:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Play/Pause
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

  // Stop
  async function handleStop() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  // Next track
  function handleNext() {
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(nextIndex);
  }

  // Previous track
  function handlePrev() {
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(prevIndex);
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  return (
    <View style={styles.container}>
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

      {/* Song Picker */}
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        style={{ marginBottom: 20 }}
      >
        {songs.map((song, index) => (
          <Pressable key={index} onPress={() => playSong(index)}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  song: {
    fontSize: 18,
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
