import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

//a tab for letting the user make customization and contains app info
export default function WOScreen() {
  return (
    <View style = {styles.topView}>
      <View>
        <TouchableOpacity onPress= {() => {
          alert('Pressed')
        }}>
          <Text>Hi</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  topView: {
    flex: 1
  },

  optionView: {
  }

})