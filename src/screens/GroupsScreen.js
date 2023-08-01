import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Storage from '../libs/Storage';
import GroupItem from '../components/Items/GroupItem';
import { WinDiag } from '../utils/constants';
import Divider from '../interface/Divider';

const winDiag = WinDiag();

export default function GroupsScreen() {

  const [ groups, setGroups ] = useState([]);

  useEffect(() => {
    getData();
  }, [])
  
  const getData = async() => {
    try {
      const data = await Storage.instance.getGroups();
      setGroups(data);
    } catch(error) {
      console.log("get groups error: ", error);
      throw new Error("get groups error: ", error);
    };
  };

  const Item = ({item}) => (
    <TouchableOpacity style={styles.itermContainer}>
      <GroupItem item={item}/>
      <View style={styles.itemButtonsContainer}>
        <Icon name="edit" type="material" size={winDiag*3} color="rgba(140,140,140,1)"/>
        <Icon name="delete" type="material" size={winDiag*3} color="rgba(140,140,140,1)"/>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={groups}
        renderItem={({item}) => <Item item={item}/>}
        ItemSeparatorComponent={<Divider height={winDiag*0.2}/>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: winDiag*2,
    paddingVertical: winDiag*1
  },
  itermContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: winDiag*5
  },
  itemButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: winDiag*9,

  }
})