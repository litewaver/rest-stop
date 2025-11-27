// MusicPlayer.js
import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Pressable, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import styles from './styles'; 

const songs = [
    {
      title: 'Song One',
      file: require('../assets/grimes-genesis.mp3'),
      image: require('../assets/images/Grimes1.webp'),
    },
    

  ];

  export default function MusicPlayer() {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
  
    async function playSound() {
      console.log('Loading Sound');
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/song.mp3') // Put your song file in assets folder
      );
      setSound(sound);
  
      console.log('Playing Sound');
      await sound.playAsync();
      setIsPlaying(true);
  
      // When playback finishes
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    }
  
    async function pauseSound() {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
      }
    }
  
    // Clean up the sound object when component unmounts
    useEffect(() => {
      return sound
        ? () => {
            sound.unloadAsync();
          }
        : undefined;
    }, [sound]);

    return (
      <View style={styles.container}>
        
        <Text style={styles.title}>Now Playing:</Text>
        <Text style={styles.song}>{songs[currentIndex].title}</Text>
  
        <View style={styles.controls}>
          <Button title="⏮ Prev" onPress={handlePrev} />
          <Button title={isPlaying ? '⏸ Pause' : '▶️ Play'} onPress={handlePlayPause} />
          <Button title="⏹ Stop" onPress={handleStop} />
          <Button title="⏭ Next" onPress={handleNext} />
        </View>
        <ScrollView horizontal style={{ marginBottom: 20 }}>
  {songs.map((song, index) => (
    <Pressable key={index} onPress={() => setCurrentIndex(index)}>
      <Image source={song.image} style={{ width: 100, height: 100, marginRight: 10 }} />
    </Pressable>
  ))}
       </ScrollView>
      </View>

      
    );
  }


 export default function MusicPlayer() {

      const songs = [
    { title: 'Song One', file: require('./assets/grimes-genesis.mp3') },
    { title: 'Song Two', file: require('./assets/2NE1-cant-nobody.mp3') },
    { title: 'Song Three', file: require('./assets/new-jeans-supernatural.mp3') },
  ];

 }
