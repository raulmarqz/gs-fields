import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { WinDiag } from '../../utils/constants';
import { Icon } from 'react-native-elements';
import useMainContext from '../../hooks/useMainContext';
import { ZoomToZone } from '../../utils/mapFunctions';

const winDiag = WinDiag();

export default function UserLocationButton({mapView}) {

  const { 
    measurementSelected,
    editMeasurementMode,
    areas,
    distances,
    poi
  } = useMainContext();

  const handleOnPress = () => {
    ZoomToZone(mapView, 'all',[areas, distances, poi]);
  };

  return (
    <Pressable 
      style={({pressed}) => [
        styles.mainContainer,
        {
          backgroundColor: pressed ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.5)"
        }
      ]}
      onPress={() => handleOnPress()}
    >
      <Icon 
        name="arrow-expand-all" 
        type="material-community"
        size={winDiag*3}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    position: "absolute",
    right: winDiag*2,
    top: winDiag*12,
    backgroundColor: "rgba(255,255,255,0.3)",
    height: winDiag*5,
    width: winDiag*5,
    justifyContent: "center",
    alignItems: "center"
  }
});