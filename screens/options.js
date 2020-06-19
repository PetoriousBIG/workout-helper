import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Options() {
  return (
    <View style = {styles.topView}>
      <View>
        <TouchableOpacity onPress= {() => {
          alert('Pressed')
        }}>
          <Text>Select Color Scheme</Text>
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