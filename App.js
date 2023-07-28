import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/stacks/MainStack';
import MainProvider from './src/context/MainContext';
import BottomSheet from './src/components/menus/BootomSheet';

export default function App() {
  return (
    <MainProvider>
      <NavigationContainer>
        <Stack />
        <BottomSheet/>
      </NavigationContainer>
    </MainProvider>
  );
};
