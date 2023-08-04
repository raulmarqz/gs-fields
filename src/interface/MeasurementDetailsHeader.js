import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WinDiag } from '../utils/constants';
import useMainContext from '../hooks/useMainContext';

const winDiag = WinDiag();

export default function MeasurementDetailsHeader() {
  const { measurementSelected } = useMainContext();

  return (
    <View style={styles.container}>
      <Text style={styles.texts}>{measurementSelected.name}</Text>
      <View style={styles.dataContainer}>
        <Text style={styles.dataTexts}>Perímetro: {measurementSelected.perimeter} m</Text>
        <Text style={styles.dataTexts}>Área: {measurementSelected.area} ha</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: winDiag*6,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  texts: {
    color: "white",
    fontSize: winDiag*2.2,
    textAlign: "center"
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  dataTexts: {
    fontSize: winDiag*1.6,
    color: "rgba(240,240,240,1)"
  }
});