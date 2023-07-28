import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { MAP_TYPES, PROVIDER_GOOGLE, ProviderPropType, Marker, Polygon } from 'react-native-maps';
import FloatButton from '../components/Map/FloatButton';
import UserLocationButton from '../components/Map/UserLocationButton';
import Extent from '../components/Map/ExtentButton';
import { _getLocationAsync } from '../config/permissions';
import { ZoomToUserLocation } from '../utils/mapFunctions';
import { INITIAL_REGION } from '../utils/constants';
import useMainContext from '../hooks/useMainContext';
import CreatePolygonTypeModal from '../interface/CreatePolygonTypeModal';
import CreatePolygonScreen from './CreatePolygonScreen';
import HeaderIcons from '../interface/HeaderIcons';
import PolygonCreation from '../components/Map/PolygonCreation';
import BottomSheet from '../components/menus/BootomSheet';

export default function HomeScreen() {
  const mapView = useRef(null);

  const {
    createPolygonMode,
    createPolygonModeType,
    editPolygonMode,
    setEditPolygonMode,
    setCoordinates,
    coordinates,
  } = useMainContext();

  // const [ coordinates, setCoordinates ] = useState([]);

  useEffect(() => {
    _getLocationAsync();
  }, [])

  const handleMapPressed = (event) => {
    if(createPolygonMode && createPolygonModeType && editPolygonMode == false) {
      const { coordinate } = event.nativeEvent;
      const coordinateData = {
        id: coordinates.length,
        ...coordinate
      }
      console.log(coordinateData)
      setCoordinates([...coordinates, coordinateData])
    };

    if(editPolygonMode) setEditPolygonMode(false);
  };

  const deleteLastCoordinate = () => {
    const newCoordinates = [...coordinates]
    const lastElement = newCoordinates.pop();
    setCoordinates([...newCoordinates])
  };

  return (
    <View style={styles.mainContainer}>
      <HeaderIcons />
      <MapView
        ref={mapView}
        initialRegion={INITIAL_REGION}
        onMapReady={() => ZoomToUserLocation(mapView)}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType={"satellite"}
        showsUserLocation={true}
        showsMyLocationButton={false}
        moveOnMarkerPress={false}
        onPress={handleMapPressed}
      >
        <PolygonCreation 
          setCoordinates={setCoordinates} 
          coordinates={coordinates} 
          mapView={mapView}
        />
      </MapView>
      <FloatButton/>
      <UserLocationButton mapView={mapView}/>
      <Extent/>
      <CreatePolygonTypeModal/>
      <CreatePolygonScreen deleteLastCoordinate={deleteLastCoordinate}/>
      <BottomSheet/>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  map:{
    flex: 1,
  }
});