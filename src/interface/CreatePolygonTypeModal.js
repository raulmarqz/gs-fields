import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import useMainContext from '../hooks/useMainContext';
import { WinDiag } from '../utils/constants';

const winDiag = WinDiag();

export default function CreatePolygonTypeModal() {
  const {
    createMeasurementMode,
    createPolygonModeType,
    setCreatePolygonModeType
  } = useMainContext();

  if(!(createMeasurementMode && createPolygonModeType == null)) return null;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Elegir modo</Text>
        <Pressable
          style={({pressed}) => [
            styles.pressables,
            {backgroundColor: pressed ? 'rgba(220,220,220,1)': "white"}
          ]}
          onPress={() => setCreatePolygonModeType('manual')}
        >
          <Icon name="pointer" type="evilicon" size={winDiag*4}/>
          <Text style={styles.texts}>Medición manual</Text>
        </Pressable>
        <Pressable 
          style={({pressed}) => [
            styles.pressables,
            {backgroundColor: pressed ? 'rgba(220,220,220,1)': "white"}
          ]}
          onPress={() => setCreatePolygonModeType('gps')}
        >
          <Icon name="gps-fixed" type="material" size={winDiag*4}/>
          <Text style={styles.texts}>Medición GPS</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContainer: {
    position: "absolute",
    width: "80%",
    height: winDiag*18,
    backgroundColor: "white"
  },
  modalTitle: {
    fontSize: winDiag*2.6,
    fontWeight: "bold",
    marginLeft: winDiag*2,
    marginTop: winDiag*1
  },
  pressables:{
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingLeft: winDiag*2
  },
  texts: {
    fontSize: winDiag*2.2,
    marginLeft: winDiag*1
  }
});