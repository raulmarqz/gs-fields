import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WinDiag } from '../utils/constants';
import useMainContext from '../hooks/useMainContext';
import { getAreaOfPolygon } from 'geolib';

const winDiag = WinDiag();

export default function GeometryCreationHeader() {

  const { coordinates } = useMainContext();

   const hectareas = () => {
    const area = getAreaOfPolygon(coordinates);
    const ha = area/10000;
    return ha.toFixed(2);
   };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.texts}>Perimetro: 0 m</Text>
      <Text style={styles.texts}>Área: {hectareas()} ha</Text>
    </View>
  );
};

const styles = StyleSheet.create({
 mainContainer: {
  position: "absolute",
  width: "100%",
  height: winDiag*5,
  backgroundColor: "rgba(0,0,0,0.4)",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
 },
 texts: {
  color: "white",
  fontSize: winDiag*2
 }
});