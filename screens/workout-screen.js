import React, { useState } from 'react';
import { AppConsumer } from '../context/app-context';
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';

//a tab for letting the user make customization and contains app info
export default function WOScreen({route, navigation}) {
  console.log(route.params)   
  const[woName, setWOName] = useState(route.params.item.name);
  
  //another "react hack", using the key force the state change to update
  const[tiKey, setTIKey] = useState(0)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AppConsumer>
          {(context) => (
            <TouchableOpacity onPress={() => {
                setTIKey(tiKey+1); //force update
                context.addWorkout({name: woName});
                navigation.goBack()}}>
              <View>
                <Text style={styles.saveText}>Save</Text>
              </View>
            </TouchableOpacity>)}
        </AppConsumer>
      ),
    });
  }, [navigation]);

  return (
    <View style = {styles.topView}>
      <View>
        <Text style = {styles.instructionText}>Enter a name for your workout</Text>
        <TextInput key = {tiKey} style = {styles.inputText} textAlign = 'center' value = {woName}
                maxLength={25} onChangeText={text => setWOName(text)}/>
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
  saveText: {
      marginRight: 25,
      color: '#37D5F8',
      fontSize: 20,
      textDecorationLine: 'underline'
  },

})