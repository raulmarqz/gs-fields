import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WinDiag } from '../utils/constants';

const winDiag = WinDiag();

export default function GeometryCreationHeader() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.texts}>Perimetro: 0 m</Text>
      <Text style={styles.texts}>Área: 0 m²</Text>
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