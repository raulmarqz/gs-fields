import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function MarkerVertex() {
  return (
    <Pressable 
      style={[
        styles.vertex,
        {
          backgroundColor:"rgba(255,255,255,1)"
        }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  vertex: {
    width: winDiag*2, 
    height: winDiag*2,
    // backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: winDiag*5
  }
})