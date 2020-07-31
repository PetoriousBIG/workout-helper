import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { AppConsumer } from '../context/app-context.js'

//a tab for letting the user make customization and contains app info
export default function Records() {
  return (
    <AppConsumer>
    {(context) => (
    <View style = {styles.topView}>
      <FlatList data={context.records}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                      const displayText = item.body
                      alert(displayText)}}>

                      <View style={styles.flatList}>
                        <Text style={styles.text}>{item.header}</Text>

                      <TouchableOpacity onPress={() => context.deleteRecord(item.key)}>
                        <View style={styles.imagePadding}>
                          <Image style={styles.image} source={require('../assets/delete.png')}/>
                        </View>
                      </TouchableOpacity>

                      </View>
                      
                  </TouchableOpacity>
                )}/>

    </View>)}
    </AppConsumer>
  )
}

const styles = StyleSheet.create({

  flatList: {
    padding: 15,
    borderWidth: .5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: 25
  },
  image: {
    width: 24,
    height: 24,
  },

})