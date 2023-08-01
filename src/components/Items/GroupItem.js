import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function GroupItem({item}) {
  return (
    <View style={styles.groupContainer}>
      <View style={styles.groupContainerLeft}>
        <View style={[styles.groupColorContainer, {backgroundColor: item?.color}]}/>
        <Text style={styles.groupSelectedText}>{item?.name}</Text>
      </View>
      {/* <View style={styles.groupContainerRight}>
        <Icon name="keyboard-arrow-right" type="material" size={winDiag*3}/>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
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
})