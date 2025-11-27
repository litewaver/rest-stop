  

function HomeScreen({ navigation }) {
  return (
    <View style={[styles.container, styles.center, { backgroundColor: '#cde5ffff' }]}>
      <Text style={styles.title}>Welcome to Safer Sounds</Text>
      <Image source={require('./assets/yoga1.png')} style={{ width: 250, height: 250 }} />

      <TouchableOpacity
        style={styles.customButton}
        onPress={() => navigation.navigate('QuizScreen')}
      >
        <Text style={styles.customButtonText}>Start Quiz</Text>
      </TouchableOpacity>

      <Button
        title="Home Page"
        onPress={() => navigation.popToTop()}
      />

      <Text style={styles.andikaText}>
        Let's find our inner peace ☁️🌿🍃✨️{"\n"}Press "Start Quiz" to begin.
      </Text>

      <BreathingCircle />
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  title: {
    fontFamily: 'Andika_400Regular',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#070314',
    marginBottom: 20,
  },
  andikaText: {
    fontFamily: 'Andika_400Regular',
    fontSize: 18,
    color: '#070314',
    marginTop: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  customButton: {
    backgroundColor: '#ecc87aff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  customButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#070314',
  },
});
export default HomeScreen;