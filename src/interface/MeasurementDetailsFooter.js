import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WinDiag } from '../utils/constants';

const winDiag = WinDiag();

export default function MeasurementDetailsFooter() {
  return (
    <View style={styles.container}>
      <Text>MeasurementDetailsFooter</Text>
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
    bottom: 0,
  },
  texts: {
    color: "white",
    fontSize: winDiag*2
  }
});