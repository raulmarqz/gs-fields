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

export default function HomeScreen() {
  const mapView = useRef(null);

  const { createPolygonMode, createPolygonModeType } = useMainContext();

  const [ coordinates, setCoordinates ] = useState([]);

  useEffect(() => {
    _getLocationAsync();
  }, [])

  const handleMapPressed = (event) => {
    if(createPolygonMode && createPolygonModeType) {
      const { coordinate } = event.nativeEvent;
      console.log(coordinate);
      setCoordinates([...coordinates, coordinate])
    };
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
        <PolygonCreation coordinates={coordinates}/>
      </MapView>
      <FloatButton/>
      <UserLocationButton mapView={mapView}/>
      <Extent/>
      <CreatePolygonTypeModal/>
      <CreatePolygonScreen deleteLastCoordinate={deleteLastCoordinate}/>
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