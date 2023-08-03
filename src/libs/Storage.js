import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  static instance = new Storage;

  storageSetUp = async() => {
    try{
      const template = {
        areas: [],
        distances: [],
        poi: [],
        groups: [{id: '0', name:'Sin grupo', color: 'rgba(90,255,195,0.8)'}]
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

};

export default Storage;