import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';

export default function App() {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#87b7eaff' }]}>
      <Text>Welcome</Text> 
        <Image
        source={require('./assets/yoga1.png')}
        style={{ width: 200, height: 200 }}
      />
      <Button title="Start Meditating" onPress={() => { /* Navigation logic to MusicPlayer screen */ }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});