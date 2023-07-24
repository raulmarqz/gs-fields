import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initRouteName="HomeScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'rgba(0,129,155,1)',
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};