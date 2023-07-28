import React, { useRef, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from "react-native-bottomsheet-reanimated";
import useMainContext from '../../hooks/useMainContext';
import { Icon } from 'react-native-elements';

export default function BootomSheet() {
  const bottomSheetRef = useRef(null);

  const { 
    setShowOptionsBottomSheet,
    showOptionsBottomSheet
  } = useMainContext();

  const snapPoints = useMemo(() => ['25%', '50%'], []);

  if(showOptionsBottomSheet == false ) return null;
  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        initialPosition={'50%'}
        snapPoints={['50%', '100%']}
        enablePanDownToClose={true}
        bottomSheerColor="#FFFFFF"
        isBackDrop={true}
        isBackDropDismissByPress={true}
        isRoundBorderWithTipHeader={true}
      >
          <TouchableOpacity 
            onPress={() => setShowOptionsBottomSheet(false)}
            style={{
              position: "absolute",
              right: 0,
              top: 0
            }}
          >
            <Icon name="close" type="material-community"/>
          </TouchableOpacity>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});