import { Text } from 'react-native';
import { useFonts, Andika_400Regular } from '@expo-google-fonts/andika';

export default function App() {
  const [fontsLoaded] = useFonts({
    Andika_400Regular,
  });

  if (!fontsLoaded) return null;

  // Apply global text style
  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [{ fontFamily: 'Andika_400Regular' }, origin.props.style],
    });
  };

  return (
    <App/>
  );
}