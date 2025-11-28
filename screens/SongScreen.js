// MusicPlayer.js
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
  Button,
} from "react-native";

import { Audio } from "expo-av";
  

const songs = [
  {
    title: "Song One",
    file: require("../assets/songs/twice-dance-the-night-away.mp3"),
    image: require("../assets/images/bibimbap.jpg"),
  },

  {
    title: "Song Two",
    file: require("../assets/songs/4minute-hot-issue.mp3"),
    image: require("../assets/images/bibimbap.jpg"),
  },
];

export default function SongPlaylist() {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Play the current song
  async function playSong(index = currentIndex) {
    // Stop previous sound
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    console.log("Loading:", songs[index].title);

    const { sound: newSound } = await Audio.Sound.createAsync(
      songs[index].file
    );

    setSound(newSound);

    console.log("Playing:", songs[index].title);

    await newSound.playAsync();
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        handleNext();
      }
    });
  }

  // Play or pause
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

  // Stop button
  async function handleStop() {
    if (sound) {
      await sound.stopAsync();
      setIsPlaying(false);
    }
  }

  // Next song
  function handleNext() {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    playSong(nextIndex);
  }

  // Previous song
  function handlePrev() {
    const prevIndex =
      (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    playSong(prevIndex);
  }

  // Cleanup
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

      {/* Song picker */}
      <ScrollView horizontal style={{ marginBottom: 20 }}>
        {songs.map((song, index) => (
          <Pressable
            key={index}
            onPress={() => {
              setCurrentIndex(index);
              playSong(index);
            }}
          >
            <Image
              source={song.image}
              style={{
                width: 100,
                height: 100,
                marginRight: 10,
                borderRadius: 10,
              }}
            />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
