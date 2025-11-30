// FancyGreeting.js
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

export default function FancyGreeting() {
  const fadeAnim = useRef(new Animated.Value(0)).current; // text opacity
  const glowAnim = useRef(new Animated.Value(1)).current; // glow scale
  const [greeting, setGreeting] = useState("");
  const [color, setColor] = useState("#333");

  // Determine greeting and color based on time
  function updateGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning ☀️");
      setColor("#FFB74D"); // warm morning color
    } else if (hour < 18) {
      setGreeting("Good Afternoon 🌤️");
      setColor("#4FC3F7"); // soft afternoon blue
    } else {
      setGreeting("Good Evening 🌙");
      setColor("#9575CD"); // calm evening purple
    }
  }

  useEffect(() => {
    updateGreeting();

    // Fade in and out loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Glow pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1.05, // slightly bigger
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.text,
          {
            opacity: fadeAnim,
            transform: [{ scale: glowAnim }],
            color: color,
            textShadowColor: color,
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10,
          },
        ]}
      >
        {greeting}
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 50,
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
  },
});
