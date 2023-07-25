import React, { useEffect, useState, createContext } from 'react';

export const MainContext = createContext();

export default function MainProvider(props) {
	const { children } = props;

	const [createPolygonMode, setCreatePolygonMode ] = useState(false);
	const [createPolygonModeType, setCreatePolygonModeType ] = useState(null);
	const [ editPolygonMode, setEditPolygonMode ] = useState(false);
	const [ coordinates, setCoordinates ] = useState([]);

	const deactivateCreatePolygonMode = () => {
		setCreatePolygonMode(false);
		setCreatePolygonModeType(null);
	};

	const valueContext = {
		createPolygonMode,
		createPolygonModeType,
		editPolygonMode,
		coordinates,
		setCreatePolygonMode,
		setCreatePolygonModeType,
		deactivateCreatePolygonMode,
		setEditPolygonMode,
		setCoordinates,
	};

  return (
    <MainContext.Provider value={valueContext}>
      { children }
    </MainContext.Provider>
  );
};