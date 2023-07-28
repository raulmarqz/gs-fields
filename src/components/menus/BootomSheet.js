import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from "react-native-bottomsheet-reanimated";
import useMainContext from '../../hooks/useMainContext';
import { Icon } from 'react-native-elements';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function BootomSheet() {
  const bottomSheetRef = useRef(null);

  const {
    setShowOptionsBottomSheet,
    showOptionsBottomSheet
  } = useMainContext();

  const HeaderItem = () => (
    <TouchableOpacity onPress={() => handleShowBottomSheet()} style={styles.headerItemContainer}>
      <Icon name="close" type="material-community"/>
    </TouchableOpacity>
  );

  const handleShowBottomSheet = () => {
    setShowOptionsBottomSheet(false)
  };

  const BodyItem = () => (
    <View>
      <View style={styles.mapsContainer}>
        <TouchableOpacity style={styles.mapsItem}>
          <Icon name="map-outline" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapsItem}>
          <Icon name="satellite-uplink" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Satelite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapsItem}>
          <Icon name="terrain" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Terreno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if(showOptionsBottomSheet == false ) return null;
  return (
    <BottomSheet
      keyboardAware
      ref={bottomSheetRef}
      initialPosition={"40%"}
      snapPoints={["0%","40%","50%","60%","70%","80%","90%","100%"]}
      bottomSheerColor="#FFFFFF"
      isBackDrop={true}
      isBackDropDismisByPress={true}
      isRoundBorderWithTipHeader={true}
      dragEnabled={true}
      header={<HeaderItem/>}
      body={<BodyItem/>}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerItemContainer: {
    position: "absolute",
    right: winDiag*1,
    top: winDiag*1
  },
  mapsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: winDiag*2
  },
  mapsItem: {
    height: winDiag*10,
    width: winDiag*10,
    justifyContent: "center",
    alignItems: "center"
  }
});