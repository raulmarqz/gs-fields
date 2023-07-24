import * as Location from 'expo-location';

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