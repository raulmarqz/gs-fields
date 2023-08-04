import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Stack from './src/stacks/MainStack';
import MainProvider from './src/context/MainContext';
import BottomSheet from './src/components/menus/BootomSheet';
import Storage from './src/libs/Storage';
import { Provider } from 'react-native-paper';

export default function App() {
  useEffect(() => {
    setUp();
  }, [])
  
  const setUp = async() => {
    await Storage.instance.storageSetUp();

  };

  return (
    <Provider>
      <MainProvider>
        <NavigationContainer>
          <Stack />
          <BottomSheet/>
        </NavigationContainer>
      </MainProvider>
    </Provider>
  );
};
