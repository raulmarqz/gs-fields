import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { WinDiag } from '../../utils/constants';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';

const winDiag = WinDiag();

export default function UserLocationButton({mapView}) {

  const ZoomToUserLocation = async() => {
    const currentLocation = await Location.getCurrentPositionAsync({}).then(res => {
      const location = {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: 0.004347936585510581,
        longitudeDelta: 0.0038338825106762897,
      }
      mapView.current.animateToRegion(location, 2000)
    })
  };

  return (
    <Pressable 
      style={({pressed}) => [
        styles.mainContainer,
        {
          backgroundColor: pressed ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)"
        }
      ]}
      onPress={() => ZoomToUserLocation()}
    >
      <Icon 
        name="gps-fixed" 
        type="material"
        size={winDiag*3}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    position: "absolute",
    right: winDiag*2,
    top: winDiag*5,
    height: winDiag*5,
    width: winDiag*5,
    justifyContent: "center",
    alignItems: "center"
  }
});