import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { Polygon, Marker } from 'react-native-maps'
import useMainContext from '../../hooks/useMainContext';
import { WinDiag } from '../../utils/constants';

const winDiag = WinDiag();

export default function PolygonCreation({coordinates}) {
  
  const { createPolygonMode, createPolygonModeType } = useMainContext();

  if(!createPolygonMode || createPolygonModeType == null || coordinates.length <= 0) return null;
  return (
    <>
      <Polygon
        coordinates={coordinates}
        fillColor='rgba(128,255,0,0.5)'
        strokeColor='rgba(128,255,0,1)'
        strokeWidth={winDiag*0.5}
      />
      {coordinates.map((coordinate, index) => (
        <Marker
          key={index}
          coordinate={coordinate}
          anchor={{x: 0.5, y: 0.5}}
          calloutAnchor={{x: 0.5, y: 0.5}}
          calloutOffset={{x: 0.5, y: 0.5}}
          centerOffset={{x: 1, y: 1}}
          draggable
          onPress={() =>console.log("pressed")}
          onSelect={e => console.log('onSelect', e)}
          onPressIn={() => console.log("press in")}
          onCalloutPress={()=> console.log("jasdasdas")}
        >
          <Pressable 
            style={[
              styles.vertex,
              {
                backgroundColor:"rgba(255,255,255,1)"
              }
            ]}
            onPressIn={() => console.log("press in")}
            onPress={() => console.log("press in")}
          />    
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