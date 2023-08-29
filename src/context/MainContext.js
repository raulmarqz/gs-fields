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
	const [ createMeasurementMode, setCreateMeasurementMode ] = useState(false);
	const [ createMeasurementModeType, setCreateMeasurementModeType ] = useState(null);
  const [ editMeasurementMode, setEditMeasurementMode ] = useState(false);
  const [ editMeasurementModeType, setEditMeasurementModeType ] = useState(null);  // measurement, data
  const [ editVertexMode, setEditVertexMode ] = useState(false);
  const [ creationType, setCreationType ] = useState('');
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
    getVisibleLayers();
  }, []);
  
  const getMeasurements = async() => {
    const measurements = await Storage.instance.getAllMeasurements();
    setAreas(measurements.areas);
    setDistances(measurements.distances);
    setPOI(measurements.poi);
  };  

  const getVisibleLayers = async() => {
    const data = await Storage.instance.getVisibleLayers();
    setVisibleLayers(data.visibleLayers);
    setMapType(data.mapType);
  };

  const getCoordsWithId = (coords) => {
    const coordinates = coords.map( (c, index) => ({id: index, latitude: c.latitude, longitude: c.longitude}));
    return coordinates;
  };

	const deactivateCreatePolygonMode = () => {
		setCreateMeasurementMode(false);
		setCreateMeasurementModeType(null);
    setEditPolygonMode(false);
    setCoordinates([]);
	};

  const deactivateDetailsMode = () => {
    setMeasurementDetailsMode(false);
    setMeasurementSelected(null);
  };

  const activateEditionMeasurementMode = (editType) => {
    console.log("Activ mode editción")
    setMeasurementDetailsMode(false);
    setCoordinates(getCoordsWithId(measurementSelected.coordinates));
    // setMeasurementSelected(null);
    setCreateMeasurementMode(true);
    setCreateMeasurementModeType('area')
    setEditMeasurementMode(true);
    setEditMeasurementModeType(editType);
  };

  const handleOptionsBottomSheet = () => {
    if(showOptionsBottomSheet) {
      setShowOptionsBottomSheet(false);
    }
    if(showOptionsBottomSheet == false) {
      setShowOptionsBottomSheet(true);
    }
  };

  const handleVisibleLayers = async(layer) => {
    console.log("kjansd")
    const response = await Storage.instance.setVisibleLayers(layer);
    getVisibleLayers();
  };

  const handleMapType = async(mapType) => {
    const response = await Storage.instance.setMapType(mapType);
    getVisibleLayers();
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
		createMeasurementMode,
		createMeasurementModeType,
    creationType,
		editMeasurementMode,
    editMeasurementModeType,
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
    editVertexMode,
		setCreateMeasurementMode,
		setCreateMeasurementModeType,
    setCreationType,
		deactivateCreatePolygonMode,
		setEditMeasurementMode,
    setEditMeasurementModeType,
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
    activateEditionMeasurementMode,
    setEditMeasurementMode,
    handleMapType,
    setEditVertexMode
	};
  
  return (
    <MainContext.Provider value={valueContext}>
      { children }
    </MainContext.Provider>
  );
};