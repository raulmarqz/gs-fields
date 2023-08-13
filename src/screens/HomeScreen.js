import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import FloatButton from '../components/Map/FloatButton';
import UserLocationButton from '../components/Map/UserLocationButton';
import Extent from '../components/Map/ExtentButton';
import { _getLocationAsync } from '../config/permissions';
import { ZoomToUserLocation } from '../utils/mapFunctions';
import { INITIAL_REGION } from '../utils/constants';
import useMainContext from '../hooks/useMainContext';
import CreatePolygonTypeModal from '../interface/CreatePolygonTypeModal';
import CreateMeasurementScreen from './CreateMeasurementScreen';
import HeaderIcons from '../interface/HeaderIcons';
import MeasurementCreation from '../components/Map/MeasurementCreation';
import MeasurementDetailsScreen from './MeasurementDetailsScreen';
import Measurements from '../components/Map/Measurements';

export default function HomeScreen() {
  const mapView = useRef(null);

  const {
    createMeasurementMode,
    createPolygonModeType,
    editPolygonMode,
    setEditPolygonMode,
    setCoordinates,
    coordinates,
    mapType,
  } = useMainContext();

  // const [ coordinates, setCoordinates ] = useState([]);

  useEffect(() => {
    _getLocationAsync();
  }, [])

  const handleMapPressed = (event) => {
    if(createMeasurementMode && createPolygonModeType && editPolygonMode == false) {
      const { coordinate } = event.nativeEvent;
      const coordinateData = {
        id: coordinates.length,
        ...coordinate
      }
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
    <>
      <View style={styles.mainContainer}>
        <HeaderIcons screen="HomeScreen"/>
        <MapView
          ref={mapView}
          initialRegion={INITIAL_REGION}
          onMapReady={() => ZoomToUserLocation(mapView)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          mapType={mapType}
          showsUserLocation={true}
          showsMyLocationButton={false}
          moveOnMarkerPress={false}
          onPress={handleMapPressed}
        >
          <Measurements mapView={mapView}/>
          <MeasurementCreation 
            setCoordinates={setCoordinates} 
            coordinates={coordinates} 
            mapView={mapView}
          />
        </MapView>
        <FloatButton/>
        <UserLocationButton mapView={mapView}/>
        <Extent mapView={mapView}/>
        <CreatePolygonTypeModal/>
        <MeasurementDetailsScreen/>
        <CreateMeasurementScreen deleteLastCoordinate={deleteLastCoordinate}/>
      </View>
    </>
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