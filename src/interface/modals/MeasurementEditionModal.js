import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WinDiag } from '../../utils/constants';
import useMainContext from '../../hooks/useMainContext';

const winDiag = WinDiag();

export default function MeasurementEditionModal() {
  const {
    editMeasurementModeType,
    editMeasurementMode,
    setEditMeasurementModeType,
    setEditMeasurementMode,
    activateEditionMeasurementMode
  } = useMainContext();

  if(!editMeasurementMode || editMeasurementModeType != null) return null;
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Editar</Text>
        <View style={styles.buttonsContainer}>

        </View>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => activateEditionMeasurementMode('measurement')}
        >
          <Text style={styles.buttonsText}>Editar forma de la medición</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => activateEditionMeasurementMode('data')}
          // onPress={() => setEditMeasurementModeType("data")}
        >
          <Text style={styles.buttonsText}>Editar información de la medición</Text>
        </TouchableOpacity>
        <View style={styles.cancelButtonContainer}>
          <TouchableOpacity >
            <Text style={styles.cancelButtonTitle}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  subContainer: {
    width: "80%",
    height: winDiag*22,
    backgroundColor: "rgba(255,255,255,1)",
    padding: winDiag*2
  },
  buttonsContainer: {
    marginTop: winDiag*2
  },
  title: {
    fontSize: winDiag*2,
    fontWeight: "bold"
  },
  buttons: {
    marginVertical: winDiag*1
  },
  buttonsText: {
    fontSize: winDiag*1.7
  },
  cancelButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: winDiag*1
  },
  cancelButtonTitle: {
    fontSize: winDiag*1.8,
    color: "rgba(0,172,207,1)",
    fontWeight: "bold",
  }
});