import React, { useEffect, useState, createContext } from 'react';
import { log } from 'react-native-reanimated';

export const MainContext = createContext();

export default function MainProvider(props) {
	const { children } = props;

	const [createPolygonMode, setCreatePolygonMode ] = useState(false);
	const [createPolygonModeType, setCreatePolygonModeType ] = useState(null);
	const [ editPolygonMode, setEditPolygonMode ] = useState(false);
	const [ coordinates, setCoordinates ] = useState([]);
  const [ showOptionsBottomSheet, setShowOptionsBottomSheet ] = useState(false);
  const [ mapType, setMapType ] = useState('hybrid');
  const [ visibleLayers, setVisibleLayers ] = useState([]);

	const deactivateCreatePolygonMode = () => {
		setCreatePolygonMode(false);
		setCreatePolygonModeType(null);
    setEditPolygonMode(false);
    setCoordinates([]);
	};

  const handleOptionsBottomSheet = () => {
    console.log("hanlde")
    if(showOptionsBottomSheet) {
      console.log("Es true");
      setShowOptionsBottomSheet(false);
    }
    if(showOptionsBottomSheet == false) {
      console.log("Es falso");
      setShowOptionsBottomSheet(true);
    }
  };

  const handleVisibleLayers = (layer) => {
    if(visibleLayers.includes(layer)){
      const layers = visibleLayers.filter(l => l != layer);
      setVisibleLayers(layers);
    } else {
      const newLayers = [...visibleLayers];
      newLayers.push(layer);
      setVisibleLayers(newLayers);
    };
  };

	const valueContext = {
		createPolygonMode,
		createPolygonModeType,
		editPolygonMode,
		coordinates,
    showOptionsBottomSheet,
    mapType,
    visibleLayers,
		setCreatePolygonMode,
		setCreatePolygonModeType,
		deactivateCreatePolygonMode,
		setEditPolygonMode,
		setCoordinates,
    setShowOptionsBottomSheet,
    handleOptionsBottomSheet,
    setMapType,
    setVisibleLayers,
    handleVisibleLayers
	};

  return (
    <MainContext.Provider value={valueContext}>
      { children }
    </MainContext.Provider>
  );
};