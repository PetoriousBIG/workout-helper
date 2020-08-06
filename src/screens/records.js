import React from 'react';
import { Text, View, TouchableOpacity, FlatList, Image} from 'react-native';
import { AppConsumer } from '../context/app-context.js'
import globalStyles from '../global-styles/styles'

//a tab for letting the user make customization and contains app info
export default function Records() {
  return (
    <AppConsumer>
    {(context) => (
    <View style={globalStyles.topContainer}>
      <FlatList data={context.records}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                      const displayText = item.body
                      alert(displayText)}}>

                      <View style={globalStyles.row}>
                        <Text style={globalStyles.flatlistHeader}>{item.header}</Text>

                        <TouchableOpacity onPress={() => context.deleteRecord(item.key)}>
                          <View>
                            <Image style={globalStyles.imageButton} source={require('../assets/delete.png')}/>
                          </View>
                        </TouchableOpacity>

                      </View>
                      
                  </TouchableOpacity>
                )}/>

    </View>)}
    </AppConsumer>
  )
}
