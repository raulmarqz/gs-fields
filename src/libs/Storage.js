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

  getGroups = async() => {
    const groups = await AsyncStorage.getItem('groups');
    return JSON.parse(groups);
  };

};

export default Storage;