import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';


const dummyData = [{name: 'item1', key: 'a' }, 
                   {name: 'item2', key: 'b'}, 
                   {name: 'item3', key: 'c'},
                   {name: 'item4', key: 'd'},
                   {name: 'item5', key: 'e'},
                   {name: 'item6', key: 'f'},
                   {name: 'item7', key: 'g'},
                   {name: 'item8', key: 'h'},
                   {name: 'item9', key: 'i'}]


//the workout list screen. this is the fist tab used in 
//top level tab navigator. this is the "Home" screen
export default function Home() {
  return (
    <View style={styles.container}>
      <FlatList data={dummyData}
                renderItem={({ item }) => (
                  
                  <TouchableOpacity onPress={() => alert(item.name) }>
                    <View style={styles.row}>
                      
                      <Text style={styles.rowText}>{item.name}</Text>
                      
                      <View style={styles.rowbuttons}>
                        <TouchableOpacity onPress={() => alert('edit ' + item.name)}>
                          <View style={styles.imagePadding}>
                            <Image style={styles.image} source={require('../assets/edit.png')}/>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert('delete ' + item.name)}>
                          <View style={styles.imagePadding}>
                            <Image style={styles.image} source={require('../assets/delete.png')}/>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                  
                  )}

                keyExtractor = {(item, index) => item.key} />
                
    </View>
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    marginBottom: '11%'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    backgroundColor: '#05DA70',
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1
  },
  rowText: {
    fontSize: 24
  },
  rowbuttons: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  image: {
    width: 24,
    height: 24,
  },
  imagePadding: {
    paddingRight: 10,
    paddingLeft: 10
  }

})
