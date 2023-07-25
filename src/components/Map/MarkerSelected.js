import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function MarkerSelected({coordinate}) {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.texts}>latitude: {coordinate?.latitude}</Text>
        <Text style={styles.texts}>longitude: {coordinate?.longitude}</Text>
      </View>
      <Icon
        name="map-marker"
        type="material-community"
        size={winDiag*9}
        color="rgba(255,51,61,0.7)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: "rgba(251,248,216,0.8)",
    paddingHorizontal: winDiag*1,
    paddingVertical: winDiag*0.5,
    marginBottom: winDiag*2
  },
  texts: {
    color: "rgba(100,100,100,1)",
    fontSize: winDiag*1.3
  }
});