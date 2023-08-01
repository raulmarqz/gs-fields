import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/stacks/MainStack';
import MainProvider from './src/context/MainContext';
import BottomSheet from './src/components/menus/BootomSheet';
import Storage from './src/libs/Storage';

export default function App() {
  useEffect(() => {
    setUp();
  }, [])
  
  const setUp = async() => {
    await Storage.instance.storageSetUp();

  };

  return (
    <MainProvider>
      <NavigationContainer>
        <Stack />
        <BottomSheet/>
      </NavigationContainer>
    </MainProvider>
  );
};
