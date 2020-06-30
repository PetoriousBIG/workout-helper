import React, { useState, useEffect } from 'react';
import { AppConsumer } from '../context/app-context';
import { StyleSheet, Text, View, ScrollView, TextInput} from 'react-native';
import { FAB } from 'react-native-paper';

//a tab for letting the user make customization and contains app info
export default function WOScreen({route, navigation}) {   
  const[woName, setWOName] = useState(route.params.item.name);

  React.useEffect(() =>{console.log(woName)}, [woName]);
  
  return (
    <AppConsumer>
    {(context) => (
      <View style = {styles.topView}>
        <View>
            <Text style = {styles.instructionText}>Enter a name for your workout</Text>
            <ScrollView keyboardShouldPersistTaps='always'>
                <TextInput style = {styles.inputText} textAlign = 'center' value = {woName}
                        maxLength={25} onChangeText={text => setWOName(text)}/>
            </ScrollView>
        </View>
        <FAB style={styles.fab} large icon="check" color="green"
              onPress={() => {
                
                if(route.params.isNew){
                   context.addWorkout(woName)
                }
                
                else{
                  context.editWorkout({name: woName}, route.params.item.key)
                }
                
                navigation.goBack()}}/>
      </View>)}
    </AppConsumer>
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
      color: '#37D5F8',
      fontSize: 20,
      textDecorationLine: 'underline'
  },
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
    borderColor: 'black',
    borderWidth: 1
  },

})