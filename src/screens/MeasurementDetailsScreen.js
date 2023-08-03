import React from 'react';
import useMainContext from '../hooks/useMainContext';
import MeasurementDetailsHeader from '../interface/MeasurementDetailsHeader';
import MeasurementDetailsFooter from '../interface/MeasurementDetailsFooter';

export default function MeasurementDetailsScreen() {
  const {
    measurementDetailsMode
  } = useMainContext();

  if(measurementDetailsMode == false) return null;
  return (
    <>
      <MeasurementDetailsHeader/>
      {/* <MeasurementDetailsFooter/> */}
    </>
  );
};