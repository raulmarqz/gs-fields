import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WinDiag } from '../utils/constants';
import useMainContext from '../hooks/useMainContext';

const winDiag = WinDiag();

export default function MeasurementDetailsHeader() {
  const { measurementSelected } = useMainContext();
  console.log(measurementSelected)
  return (
    <View style={styles.container}>
      <Text style={styles.texts}>{measurementSelected.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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