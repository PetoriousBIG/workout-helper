import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//a tab for letting the user make customization and contains app info
export default function Options() {
  return (
    <View style = {styles.topView}>
      <View>
        <TouchableOpacity onPress= {() => {
          alert('Pressed')
        }}>
          <Text>Hello World</Text>
        </TouchableOpacity>
      </View>
    </View>
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