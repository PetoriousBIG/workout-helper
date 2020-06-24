import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

//a tab for letting the user make customization and contains app info
export default function WOScreen({route, navigation}) {   
  const[woName, setWOName] = useState("");

  const { isNew } = route.params

  return (
    <View style = {styles.topView}>
      <View>
        <Text style = {styles.instructionText}>Enter a name for your workout</Text>
        <TextInput style = {styles.inputText} placeholder = {woName} textAlign = 'center' value = {woName}
                   onChangeText={(text) => setWOName(text)} maxLength={25}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  topView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  instructionText: {
      fontSize: 30,
  },
  inputText: {
      fontSize: 30,
      borderBottomWidth: 1
  },
})