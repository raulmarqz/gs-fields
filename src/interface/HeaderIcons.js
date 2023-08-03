import { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import useMainContext from "../hooks/useMainContext";
import { useNavigation } from "@react-navigation/native";
import { WinDiag } from "../utils/constants";

const winDiag = WinDiag()

export default function HeaderIcons({screen}) {
  const navigation = useNavigation();

  const {
    createPolygonMode,
    createPolygonModeType,
    deactivateCreatePolygonMode,
    handleOptionsBottomSheet,
    SaveMeasurement,
    measurementName
  } = useMainContext();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {screen == 'HomeScreen' &&
            <View style={styles.mainContainer}>
              {(createPolygonMode && createPolygonModeType) && <CreatePolygonScreen/>}
              <TouchableOpacity onPress={() => handleOptionsBottomSheet()}>
                <Icon name="layers" type="material-community" size={winDiag*3} color="white" style={styles.icon}/>
              </TouchableOpacity>
            </View>
          }
          {screen == 'SaveMeasurementScreen' &&
            <View style={styles.mainContainer}>
              <TouchableOpacity onPress={() => handleSaveMeasurement()}>
              {/* <TouchableOpacity onPress={() => SaveMeasurement()}> */}
                <Icon name="content-save" type="material-community" size={winDiag*3} color="white" style={styles.icon}/>
              </TouchableOpacity>
            </View>
          }
        </>
      )
    })
  }, [createPolygonMode, createPolygonModeType, measurementName])

  const CreatePolygonScreen = () => (
    <View style={styles.createPolygonScreenContainer}>
      <TouchableOpacity onPress={() => deactivateCreatePolygonMode()}>
        <Icon name="close" type="material-community" size={winDiag*3} color="white" style={styles.icon}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("SaveMeasurementScreen")}>
        <Icon name="content-save" type="material-community" size={winDiag*3} color="white" style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );

  const GroupsScreen = () => {
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("SaveMeasurementScreen")}>
        <Icon name="plus" type="material-community" size={winDiag*3} color="white" style={styles.icon}/>
      </TouchableOpacity>
    </View>
  };

  const handleSaveMeasurement = () => {
    deactivateCreatePolygonMode();
    SaveMeasurement();
    navigation.goBack();
  };

  return null;
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: winDiag*1,
  },
  createPolygonScreenContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  icon: {
    marginHorizontal: winDiag*1
  }
})