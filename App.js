import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/stacks/MainStack';
import MainProvider from './src/context/MainContext';

export default function App() {
  return (
    <MainProvider>
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </MainProvider>
  );
};
