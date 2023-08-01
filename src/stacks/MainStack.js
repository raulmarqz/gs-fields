import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SaveMesurementScreen from '../screens/SaveMesurementScreen';
import GroupsScreen from '../screens/GroupsScreen';

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
      <Stack.Screen
        name="SaveMeasurementScreen"
        component={SaveMesurementScreen}
        options={{
          title: "Información de medición"
        }}
      />
      <Stack.Screen
        name="GroupsScreen"
        component={GroupsScreen}
        options={{
          title: "Grupos"
        }}
      />
    </Stack.Navigator>
  );
};