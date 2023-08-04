import * as Location from 'expo-location';
import useMainContext from '../hooks/useMainContext';
import { getBounds, getCenterOfBounds } from 'geolib';
import { Dimensions } from 'react-native';

export const ZoomToUserLocation = async(mapView) => {
    const currentLocation = await Location.getCurrentPositionAsync({}).then(res => {
      const location = {
        latitude: res.coords.latitude,
        longitude: res.coords.longitude,
        latitudeDelta: 0.004347936585510581,
        longitudeDelta: 0.0038338825106762897,
      }
      mapView.current.animateToRegion(location, 2000)
    })
  };

export const ZoomToZone = (mapView, typeOfZoom, measurements) => {
  const { width, height } = Dimensions.get('window');

  if(typeOfZoom == 'all') {
    var coordinates = [];
    measurements.forEach(measure => {
      measure.forEach(m => {
        const areaCoords = m.coordinates.map(c => ({latitude: c.latitude, longitude: c.longitude}) )
        coordinates = [...coordinates, ...areaCoords];
      })
    });
  };

  if(typeOfZoom == 'measurementSelected') {
    var coordinates = measurements.coordinates;
  };

  var extent = getBounds(coordinates);
  var center = getCenterOfBounds(coordinates);

  const minLatitude = extent.minLat;
  const maxLatitude = extent.maxLat;
  const minLongitude = extent.maxLng;
  const maxLongitude = extent.minLng;
  const aspectRatio = height/width;
  const latitudeDelta = (maxLatitude - minLatitude)
  const longitudeDelta = (minLongitude - maxLongitude) + 0.010;
  // const longitudeDelta = (minLongitude - maxLongitude) + 0.010;

  const position = {
    latitude: center.latitude,
    longitude: center.longitude,
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta
  };
  mapView.current.fitToCoordinates(coordinates)
  // mapView.current.animateToRegion(position, 2000);
};