import React, { useEffect, useState, createContext } from 'react';
import Storage from '../libs/Storage';
import { getAreaOfPolygon, getPathLength } from 'geolib';
import uuid from 'react-native-uuid';

export const MainContext = createContext();

export default function MainProvider(props) {
	const { children } = props;

  const [ areas, setAreas ] = useState([]);
  const [ distances, setDistances ] = useState([]);
  const [ poi, setPOI ] = useState([]);
	const [ createPolygonMode, setCreatePolygonMode ] = useState(false);
	const [ createPolygonModeType, setCreatePolygonModeType ] = useState(null);
  const [ editMeasurementMode, setEditMeasurementMode ] = useState(false);
  const [ creationType, setCreationType ] = useState('')
	const [ editPolygonMode, setEditPolygonMode ] = useState(false);
  const [ measurementDetailsMode, setMeasurementDetailsMode ] = useState(false);
	const [ coordinates, setCoordinates ] = useState([]);
  const [ showOptionsBottomSheet, setShowOptionsBottomSheet ] = useState(false);
  const [ mapType, setMapType ] = useState('hybrid');
  const [ visibleLayers, setVisibleLayers ] = useState([]);
  const [ groupSelected, setGroupSelected ] = useState({id: '0', name:'Sin grupo', color: 'rgba(90,255,195,0.8)'})
  const [ measurementName, setMeasurementName ] = useState('');
  const [ measurementPhotos, setMeasurementPhotos ] = useState([]);
  const [ measurementNotes, setMeasurementNotes ] = useState([]);
  const [ measurementSelected, setMeasurementSelected ] = useState(null);

  useEffect(() => {
    getMeasurements();
  }, []);
  
  const getMeasurements = async() => {
    const measurements = await Storage.instance.getAllMeasurements();
    console.log(measurements)
    setAreas(measurements.areas);
    setDistances(measurements.distances);
    setPOI(measurements.poi);
  };

	const deactivateCreatePolygonMode = () => {
		setCreatePolygonMode(false);
		setCreatePolygonModeType(null);
    setEditPolygonMode(false);
    setCoordinates([]);
	};

  const deactivateDetailsMode = () => {
    setMeasurementDetailsMode(false);
    setMeasurementSelected(null);
  };

  const activateEditionMode = () => {
    setMeasurementDetailsMode(true);
    setCoordinates(measurementSelected.coordinates);
    setMeasurementSelected(null);
  };

  const handleOptionsBottomSheet = () => {
    if(showOptionsBottomSheet) {
      setShowOptionsBottomSheet(false);
    }
    if(showOptionsBottomSheet == false) {
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

  const SaveMeasurement = async() => {
    try {
      data = {
        uuid: uuid.v4(),
        measurementType: creationType,
        name: measurementName,
        groupId: groupSelected.id,
        coordinates: coordinates,
        photos: measurementPhotos,
        notes: measurementNotes,
        area: hectareas(),
        perimeter: getPerimeter(),
      };
      console.log(data)
      setMeasurementSelected(data);
      setMeasurementDetailsMode(true);
      handleVisibleLayers(creationType);
      const response = await Storage.instance.saveMeasurement(creationType, data);
      getMeasurements();
      return response;
    } catch(error) {
      console.log("Save measurement error: ", error);
      throw new Error("Save measurement error: ", error);
    };
  };

  const hectareas = () => {
    const area = getAreaOfPolygon(coordinates);
    const ha = area/10000;
    return ha.toFixed(2);
  };

  const getPerimeter = () => {
  const distance = getPathLength(coordinates);
  return distance;
  };

  const handleMeasurementPress = (item) => {
    setMeasurementSelected(item);
    setMeasurementDetailsMode(true);
  };

  const deleteMeasurement = async() => {
    try {
      const response = await Storage.instance.deleteMeasurement(measurementSelected);
      setMeasurementDetailsMode(false);
      setMeasurementSelected(null);
      getMeasurements();
      return response;
    } catch (error) {
      
    }
  };

	const valueContext = {
		createPolygonMode,
		createPolygonModeType,
    creationType,
		editPolygonMode,
		coordinates,
    showOptionsBottomSheet,
    mapType,
    visibleLayers,
    groupSelected,
    measurementName,
    measurementDetailsMode,
    measurementSelected,
    areas,
    distances, 
    poi,
    editMeasurementMode,
		setCreatePolygonMode,
		setCreatePolygonModeType,
    setCreationType,
		deactivateCreatePolygonMode,
		setEditPolygonMode,
		setCoordinates,
    setShowOptionsBottomSheet,
    handleOptionsBottomSheet,
    setMapType,
    setVisibleLayers,
    handleVisibleLayers,
    setGroupSelected,
    setMeasurementName,
    SaveMeasurement,
    setMeasurementDetailsMode,
    setMeasurementSelected,
    handleMeasurementPress,
    deleteMeasurement,
    deactivateDetailsMode,
    activateEditionMode,
    setEditMeasurementMode
	};
  
  return (
    <MainContext.Provider value={valueContext}>
      { children }
    </MainContext.Provider>
  );
};