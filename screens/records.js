import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import { AppConsumer } from '../context/app-context.js'

//a tab for letting the user make customization and contains app info
export default function Records() {
  return (
    <AppConsumer>
    {(context) => (
    <View style = {styles.topView}>
      <FlatList data={context.records}
                keyExtractor={(item, index) => item.key}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => {
                    const displayText = item.body
                    alert(displayText)}}>
                    <Text>{item.header}</Text>
                  </TouchableOpacity>
                )}/>

    </View>)}
    </AppConsumer>
  )
}

const styles = StyleSheet.create({

  topView: {
    flex: 1,
    justifyContent: 'center'
  },

  optionView: {
  }

})