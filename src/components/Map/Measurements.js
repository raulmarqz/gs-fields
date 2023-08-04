import React from 'react';
import { View, Text } from 'react-native';
import useMainContext from '../../hooks/useMainContext';
import { Polygon, Marker, Polyline } from 'react-native-maps';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function Measurements() {
  const {
    areas,
    distances,
    poi,
    visibleLayers,
    handleMeasurementPress
  } = useMainContext();

  const renderAreas = () => (
    areas.map(area => (
      <Polygon
        key={area.uuid.toString()}
        tappable
        coordinates={area.coordinates}
        fillColor={'rgba(90,255,195,0.3)'}
        strokeColor='rgba(90,255,195,0.8)'
        strokeWidth={winDiag*0.3}
        onPress={() => handleMeasurementPress(area)}
      />
    ))
  );
  
  return (
    <>
      {visibleLayers.includes('areas') && renderAreas()}
      {visibleLayers.includes('distances') && renderAreas()}
      {visibleLayers.includes('poi') && renderAreas()}
    </>
  );
};