import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WinDiag } from '../utils/constants';
import { Icon } from 'react-native-elements';

const winDiag = WinDiag();

export default function GeometryCreationHeader({deleteLastCoordinate}) {
  return (
    <View style={styles.mainContainer}>
      <Icon name="keyboard-arrow-left" type="material" color="white" size={winDiag*3}/>
      <Icon name="plus" type="material-community" color="white" size={winDiag*3}/>
      <Icon name="delete" type="material-community" color="white" size={winDiag*3}/>
      <TouchableOpacity onPress={() => deleteLastCoordinate()}>
        <Icon name="undo" type="material-community" color="white" size={winDiag*3}/>
      </TouchableOpacity>
      <Icon name="keyboard-arrow-right" type="material" color="white" size={winDiag*3}/>
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
  bottom: 0,
  flexDirection: "row"
 },
 texts: {
  color: "white",
  fontSize: winDiag*2
 }
});