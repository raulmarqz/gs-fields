import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import  { Icon } from 'react-native-elements';
import useMainContext from '../../hooks/useMainContext';

export default function FloatButton() {

  const { 
    setCreateMeasurementMode,
    createMeasurementMode,
    createPolygonModeType,
    setCreationType,
    measurementDetailsMode
  } = useMainContext()

  const actions = [
    {
      text: "Distancia",
      icon: <Icon name="shape-polygon-plus" type="material-community"/>,
      name: "distance",
      position: 2,
      color: "rgba(0,209,238,0.5)"
    },
    {
      text: "Área",
      icon: <Icon name="shape-polygon-plus" type="material-community"/>,
      name: "area",
      position: 1,
      color: "rgba(0,209,238,0.5)"
    },
    {
      text: "POI",
      icon: <Icon name="shape-polygon-plus" type="material-community"/>,
      name: "poi",
      position: 3,
      color: "rgba(0,209,238,0.5)"
    }
  ];

  const handlePressItem = (name) => {
    if(name == 'area') setCreateMeasurementMode(true), setCreationType('area');
  };

  if((createMeasurementMode && createPolygonModeType) || measurementDetailsMode ) return null
  return (
    <View style={styles.mainContainer}>
      <FloatingAction
        actions={actions}
        color="rgba(0,209,238,1)"
        onPressItem={name => handlePressItem(name)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {

  }
})