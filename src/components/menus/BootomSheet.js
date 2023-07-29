import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from "react-native-bottomsheet-reanimated";
import useMainContext from '../../hooks/useMainContext';
import { Icon } from 'react-native-elements';
import { WinDiag } from '../../utils/constants';
import Divider from '../../interface/Divider';

const winDiag = WinDiag();

export default function BootomSheet() {
  const bottomSheetRef = useRef(null);

  const {
    setShowOptionsBottomSheet,
    showOptionsBottomSheet,
    setMapType,
    mapType,
    visibleLayers,
    handleVisibleLayers
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
      <Text style={styles.typeOfMapTitle}>Tipos de mapa: </Text>
      <View style={styles.mapsContainer}>
        <TouchableOpacity 
          style={[
            styles.mapsItem,
            mapType == 'hybrid' ? {
              borderWidth: winDiag*0.2,
              borderColor: "rgba(0,212,255, 1)",
              borderRadius: winDiag*1
            } : null
          ]} 
          onPress={() => setMapType('hybrid')}
          >
          <Icon name="satellite-uplink" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Satelite</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.mapsItem,
            mapType == 'standard' ? {
              borderWidth: winDiag*0.2,
              borderColor: "rgba(0,212,255, 1)",
              borderRadius: winDiag*1
            } : null
          ]} 
          onPress={() => setMapType('standard')}
        >
          <Icon name="map-outline" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.mapsItem,
            mapType == 'terrain' ? {
              borderWidth: winDiag*0.2,
              borderColor: "rgba(0,212,255, 1)",
              borderRadius: winDiag*1
            } : null
          ]} 
          onPress={() => setMapType('terrain')}
        >
          <Icon name="terrain" type="material-community" size={winDiag*5} color="rgba(180,180,180,0.8)"/>
          <Text>Terreno</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: winDiag*3}}>
        <Divider height={winDiag*0.2}/>
      </View>
      <View>
        <Text></Text>
        <View style={styles.layersContainer}>
          <TouchableOpacity 
            style={[
              styles.mapsItem,
              visibleLayers.includes("distance") ? {
                borderWidth: winDiag*0.2,
                borderColor: "rgba(0,212,255, 1)",
                borderRadius: winDiag*1
              } : null
            ]} 
            onPress={() => handleVisibleLayers('distance')}
            >
            <Icon name="route" type="font-awesome-5" size={winDiag*4} color="rgba(180,180,180,0.8)"/>
            <Text>Distancias</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.mapsItem,
              visibleLayers.includes("polygons") ? {
                borderWidth: winDiag*0.2,
                borderColor: "rgba(0,212,255, 1)",
                borderRadius: winDiag*1
              } : null
            ]} 
            onPress={() => handleVisibleLayers('polygons')}
          >
            <Icon name="draw-polygon" type="font-awesome-5" size={winDiag*4} color="rgba(180,180,180,0.8)"/>
            <Text>Áreas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.mapsItem,
              visibleLayers.includes("poi") ? {
                borderWidth: winDiag*0.2,
                borderColor: "rgba(0,212,255, 1)",
                borderRadius: winDiag*1
              } : null
            ]} 
            onPress={() => handleVisibleLayers('poi')}
          >
            <Icon name="map-marker-alt" type="font-awesome-5" size={winDiag*4} color="rgba(180,180,180,0.8)"/>
            <Text>POI</Text>
          </TouchableOpacity>
        </View>
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
    marginTop: winDiag*2,
  },
  mapsItem: {
    height: winDiag*8,
    width: winDiag*8,
    justifyContent: "center",
    alignItems: "center"
  },
  typeOfMapTitle: {
    fontSize: winDiag*1.9,
    marginLeft: winDiag*1,
    color: "rgba(90,90,90,1)"
  },
  layersContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: winDiag*2,
  }
});