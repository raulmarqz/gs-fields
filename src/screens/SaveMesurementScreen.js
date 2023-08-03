import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import useMainContext from '../hooks/useMainContext';
import { WinDiag } from '../utils/constants';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import HeaderIcons from '../interface/HeaderIcons';

const winDiag = WinDiag();

export default function SaveMesurementScreen() {
  const navigation = useNavigation();

  const {
    groupSelected,
    setMeasurementName,
    SaveMeasurement,
    measurementName,
  } = useMainContext();

  return (
    <>
      <HeaderIcons screen="SaveMeasurementScreen"/>
      <View style={styles.container}>
        <Input
          label="Nombre de la medición"
          labelStyle={styles.nameLabelStyle}
          containerStyle={styles.nameInputStyle}
          onChangeText={(value) => setMeasurementName(value)}
          value={measurementName}
        />
        <View>
          <Text style={styles.groupTitle}>Grupo</Text>
          <TouchableOpacity style={styles.groupContainer} onPress={() => navigation.navigate("GroupsScreen")}>
            <View style={styles.groupContainerLeft}>
              <View style={[styles.groupColorContainer, {backgroundColor: groupSelected?.color}]}/>
              <Text style={styles.groupSelectedText}>{groupSelected?.name}</Text>
            </View>
            <View style={styles.groupContainerRight}>
              <Icon name="keyboard-arrow-right" type="material" size={winDiag*3}/>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.fieldInfoTitle}>Información de campo</Text>
          <View style={styles.fieldInfoContainer}>
            <TouchableOpacity>
              <Icon name="camera-plus-outline" type="material-community" size={winDiag*5} color="rgba(80,80,80,1)"/>
              <Text>Camara</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="note-plus-outline" type="material-community" size={winDiag*5} color="rgba(80,80,80,1)"/>
              <Text>Nota de campo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: winDiag*2
  },
  groupContainer: {
    flexDirection: "row",
    height: winDiag*5,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: winDiag*1,
  },
  groupContainerLeft: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  groupContainerRight: {
    alignItems: "center",
    marginRight: winDiag*1
  },
  groupColorContainer: {
    height: "100%",
    width: winDiag*1,
    borderRadius: winDiag*5,
  },
  groupSelectedText: {
    textAlign: "center",
    fontSize: winDiag*1.9,
    marginLeft: winDiag*1
  },
  groupTitle: {
    fontSize: winDiag*1.9,
    fontWeight: "bold",
    color: "rgba(150,150,150,1)",
  },
  nameLabelStyle: {
    fontSize: winDiag*1.9,
    fontWeight: "bold",
    color: "rgba(150,150,150,1)"
  },
  nameInputStyle: {
    marginTop: winDiag*1
  },
  fieldInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: winDiag*3
  },
  fieldInfoTitle: {
    fontSize: winDiag*1.9,
    fontWeight: "bold",
    color: "rgba(150,150,150,1)",
    marginTop: winDiag*3
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: winDiag*1,
  },
})