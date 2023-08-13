import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WinDiag } from '../utils/constants';
import { Icon } from 'react-native-elements';
import { Portal, Dialog, Button } from 'react-native-paper';
import useMainContext from '../hooks/useMainContext';

const winDiag = WinDiag();

export default function MeasurementDetailsFooter() {
  const { 
    deleteMeasurement,
    activateEditionMode,
  } = useMainContext();

  const [ deleteDialog, setDeleteDialog ] = useState(false);

  const handleDeleteMeasurementDialog = () => {
    setDeleteDialog(true);
  };

  const handleDeleteMeasurement = () => {
    setDeleteDialog(false),
    deleteMeasurement();
  }

  return (
    <Portal>
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="navigation-variant" type="material-community" color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => activateEditionMode()}>
          <Icon name="edit" type="material" color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteMeasurementDialog()}>
          <Icon name="delete" type="material-community" color="white"/>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="share-social" type="ionicon" color="white"/>
        </TouchableOpacity>
      </View>
      <Dialog visible={deleteDialog} onDismiss={() => setDeleteDialog(false)}>
        <Dialog.Content>
          <Text>¿Eliminar medición?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => setDeleteDialog(false)}>Cancelar</Button>
          <Button onPress={() => handleDeleteMeasurement()}>Aceptar</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
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
});