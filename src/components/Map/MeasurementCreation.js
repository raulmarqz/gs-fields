import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Polygon, Marker } from 'react-native-maps'
import useMainContext from '../../hooks/useMainContext';
import { WinDiag } from '../../utils/constants';
import MarkerSelected from './MarkerSelected';
import MarkerVertex from './MarkerVertex';
import CreateMeasurementScreen from '../../screens/CreateMeasurementScreen';

const winDiag = WinDiag();

export default function MeasurementCreation({ mapView }) {
  
  const {
    createMeasurementMode,
    createMeasurementModeType,
    editMeasurementMode,
    setEditMeasurementMode,
    setCoordinates,
    coordinates,
    editVertexMode,
    setEditVertexMode
  } = useMainContext();

  const [vertexSelected, setVertexSelected ] = useState(null);
  const [prevCamera, setPrevCamera ] = useState(null);
  const [ camera, setCamera ] = useState(null);

  useEffect(() => {
    // if(editPolygonMode == false) set_Coordinates(coordinates);
  }, [coordinates])

  useEffect(() => {
    if(editVertexMode) getCamera();
    if(editVertexMode == false) setVertexSelected(null), setCoordinates(coordinates);
  }, [camera, editVertexMode]);

  useEffect(() => {
    setPrevCamera(camera);
    if(editVertexMode && (prevCamera?.center.latitude != camera?.center.latitude)) vertexEdition();
  }, [camera]);

  const getCamera = async() => {
    console.log("get camera")
    const cam = await mapView.current.getCamera();
    setCamera(cam);
  };

  const handleMarkerPress = async(coordinate) => {
    const cam = await mapView.current.getCamera();
    setVertexSelected(coordinate);
    setPrevCamera(cam);
    if(editVertexMode == false) setEditVertexMode(true);
  };

  const coordRelation = () => {
    const init = {latitude: prevCamera?.center?.latitude, longitude: prevCamera?.center?.longitude};
    const final = {latitude: camera?.center?.latitude, longitude: camera?.center?.longitude}

    const mov_x = (final.latitude - init.latitude);
    const mov_y = (final.longitude - init.longitude);

    return {x: mov_x, y: mov_y};
  };

  const vertexEdition = () => {
    if(editVertexMode) {
      const vertexSelectedId = vertexSelected.id;
      const oldCoords = [...coordinates];
      // editar vertice del poligono y del vertice seleciconado mediante el id
      const newPolygon = oldCoords.map(v => {
        if(vertexSelectedId == v.id) {
          const relation = coordRelation();
          return({id: v.id, latitude: v.latitude + relation.x, longitude: v.longitude + relation.y});
        };
        return(v);
      });
      setCoordinates(newPolygon);
    };
  };

  if(!createMeasurementMode || createMeasurementModeType == null || coordinates.length <= 0) return null;
  return (
    <>
      <Polygon
        coordinates={coordinates.map(c => ({latitude:c.latitude, longitude:c.longitude}))}
        fillColor={'rgba(90,255,195,0.3)'}
        strokeColor='rgba(90,255,195,0.8)'
        strokeWidth={winDiag*0.3}
      />
      {coordinates.map((coordinate, index) => (
        <Marker
          key={index}
          coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}
          anchor={vertexSelected?.id == coordinate?.id ? {x: 0.5, y: 1} : {x: 0.5, y: 0.5}}
          calloutAnchor={vertexSelected?.id == coordinate?.id ? {x: 0.5, y: 0} : {x: 0.5, y: 0.5}}
          calloutOffset={vertexSelected?.id == coordinate?.id ? {x: 0, y: 0} : {x: 0.5, y: 0.5}}
          centerOffset={{x: 1, y: 1}}
          draggable={vertexSelected?.id == coordinate?.id ? true : false}
          onPress={() => handleMarkerPress(coordinate)}
        >
          {vertexSelected?.id == coordinate?.id
            ? <MarkerSelected coordinate={coordinate}/>
            : <MarkerVertex/>
          }
        </Marker>
      ))}
    </>
  )
};

const styles = StyleSheet.create({
  vertex: {
    width: winDiag*2, 
    height: winDiag*2,
    // backgroundColor: "rgba(255,255,255,0.7)",
    borderRadius: winDiag*5
  }
})