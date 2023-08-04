import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage;

  storageSetUp = async() => {
    try{
      const template = {
        areas: [],
        distances: [],
        poi: [],
        groups: [{id: '0', name:'Sin grupo', color: 'rgba(90,255,195,0.8)'}],
        configuration: {
          visibleLayers: [],
          mapType: 'hybrid',
        }
      };

      const keys = await AsyncStorage.getAllKeys();
      Object.keys(template).forEach(async(key) => {
        if(!keys.includes(key)) {
          await AsyncStorage.setItem(key, JSON.stringify(template[key]));
        };
      });
    } catch(error){
      console.log("Storage setup error: ", error);
      // throw new Error("Storage setup error: ", error);
    };
  };

  getData = async(key) => {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  };

  setVisibleLayers = async(layer) => {
    try {
      const config = await this.getData('configuration');
      var visibleLayers = config.visibleLayers;
      const vl = [...visibleLayers];

      if(vl.includes(layer)) {
        var layers = vl.filter(l => l != layer);
        config.visibleLayers = layers;
      } else {
        var layers = [...vl, layer];
        config.visibleLayers = layers;
      };

      const response = await this.saveData('configuration', config);
      return response;
    } catch (error) {
      console.log("set visible layers error: ", error);
      throw new Error("set visible layers error: ", error);
    }
  };

  setMapType = async(mapType) => {
    try {
      const config = await this.getData('configuration');
      config.mapType = mapType;

      const response = await this.saveData('configuration', config);
      return response;
    } catch (error) {
      console.log("set map type error: ", error);
      throw new Error("set map type error: ", error);
    }
  };

  getVisibleLayers = async() => {
    try {
      const data = await this.getData('configuration');
      return ({visibleLayers: data.visibleLayers, mapType: data.mapType});
    } catch (error) {
      console.log("get visible layers error: ", error);
      throw new Error("get visible layers error: ", error);
    }
  };

  getAllMeasurements = async() => {
    try {
      const areas = await this.getData('areas');
      const distances = await this.getData('distances');
      const poi = await this.getData('poi');

      return {areas, distances, poi}
    } catch (error) {
      console.log("get all measurements error: ", error);
      throw new Error("get all measurements error: ", error);
    }
  };

  saveData = async(key, data) => {
    try {
      const response = await AsyncStorage.setItem(key, JSON.stringify(data))
      return response;
    } catch(error) {
      console.log("save data error: ", error);
      throw new Error("save data error: ", error);
    };
  }

  getGroups = async() => {
    const groups = await AsyncStorage.getItem('groups');
    return JSON.parse(groups);
  };

  saveMeasurement = async(measurementType, data) => {
    try {
      if(measurementType == 'area') {
        const areas = await this.getData('areas');
        areas.push(data);
        const response = await this.saveData('areas', areas);
        return response
      };
    } catch(error) {
      console.log("save measurement error: ", error);
      throw new Error("save measurement error: ", error);
    };
  };

  deleteMeasurement = async(data) => {
    try {
      if(data.measurementType == 'area') {
        const areas = await this.getData('areas');
        const areasCopy = [...areas]
        const newAreas = areasCopy.filter(area => area.uuid != data.uuid);
        const response = await this.saveData('areas', newAreas);
        return response;
      }

    } catch (error) {
      console.log("delete measurement error: ", error);
      throw new Error("delete measurement error: ", error);
    }
  };

};

export default Storage;