import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function Divider({height}) {
  return (
    <View
      style={[styles.container,{height: height}]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(200,200,200,0.5)",
    width: "100%"
  }
})