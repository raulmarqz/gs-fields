import React from 'react'
import GeometryCreationHeader from '../interface/GeometryCreationHeader';
import GeometryCreationFooter from '../interface/GeometryCreationFooter';
import useMainContext from '../hooks/useMainContext';

export default function CreatePolygonScreen({deleteLastCoordinate}) {
  const { createPolygonMode, createPolygonModeType } = useMainContext();

  if(!(createPolygonMode && createPolygonModeType)) return null;
  return (
    <>
      <GeometryCreationHeader/>
      <GeometryCreationFooter deleteLastCoordinate={deleteLastCoordinate}/>
    </>
  );
};