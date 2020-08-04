import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AppConsumer } from '../context/app-context';
import { Keyboard, StyleSheet, Text, View, TextInput, Alert, BackHandler } from 'react-native';
import { FAB } from 'react-native-paper';
import { HeaderBackButton } from '@react-navigation/stack';
import WorkoutInput from '../components/workoutInput';

//a tab for letting the user make customization and contains app info
export default function WOScreen({route, navigation}) {   
  const[woName, setWOName] = useState(route.params.item.name);
  const[exercises, setExercises] = useState(route.params.item.exercises);   
  const[kbOpen, setKBOpen] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => backHandler()}/>
      )
    })
  })

  useEffect(() => {
    //keyboard listeners to keep the FAB out of the way 
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);


    const androirdHWBackButton = BackHandler.addEventListener(
      "hardwareBackPress",
      backHandler)

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      androirdHWBackButton.remove()
    };
  }, []);

  const backHandler = () => {
    Alert.alert("Are you sure?", "Going back will dismiss changes without saving.",
                [{text: "OK",
                  onPress: () => {
                    navigation.goBack()}},
                 {text: "Cancel",
                  style: "cancel"}])
    //return true is needed to suppress the back action for the Android Hardware back button
    return true
  }

  const _keyboardDidShow = () => {
    setKBOpen(true);
  };

  const _keyboardDidHide = () => {
    setKBOpen(false);
  };

  const checkInputs = () => {
    const areNamesValid = checkNames()
    const areSetsAndRepsValid = checkSetsAndReps()
    return areNamesValid && areSetsAndRepsValid
  }

  const checkNames = () => {
    if (woName.length < 1 || exercises.length == 0){
      return false
    }

    var i;
    for (i = 0; i < exercises.length; i++){
      if(exercises[i].name.length < 1){
        return false
      }
    }
    return true
  }

  const checkSetsAndReps = () => {
    if (exercises.length == 0){
      return false
    }
    var i;
    for (i = 0; i < exercises.length; i++){
      if(exercises[i].sets == '' || exercises[i].reps == ''){
        return false
      }
    }
    return true
  }

  return (
    
    <AppConsumer>
    {(context) => (
      <View style = {styles.topView}>
        <View>
            <Text style = {styles.instructionText}>Enter a name for your workout</Text>
            <TextInput style = {styles.inputText} textAlign = 'center' value = {woName}
                maxLength={25} onChangeText={text => setWOName(text)}/>
        </View>

        <View style={{marginTop: '5%'}}> 
            <Text style = {styles.instructionText}>Enter the exercises, sets, and reps for your workout</Text>
            
        </View>

        <View style={styles.container}>
          <WorkoutInput value={exercises}/>
        </View>
        
        <FAB style={styles.fab} visible = {!kbOpen} large icon="check" color="green"
              onPress={() => {

                const isValidWorkout = checkInputs()

                if(isValidWorkout){
                  if(route.params.isNew){
                   context.addWorkout(woName, exercises)
                  }
                
                  else{
                    context.editWorkout({name: woName, exercises: exercises}, route.params.item.key)
                  }
                
                  navigation.goBack()
                }

                else{
                  alert('Invalid input: Please supply a Name to Workout and all exercises. ' +
                  'Additionally please make sure all Sets and Reps fields have values.')
                }
                
                }}/>
      </View>)}
    </AppConsumer>
  )
}


const styles = StyleSheet.create({

  topView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10 },
  
  instructionText: {
      fontSize: 20, 
      textAlign: 'center' },
  
  inputText: {
      fontSize: 20,
      borderBottomWidth: 1 },
  
  saveText: {
      color: '#37D5F8',
      fontSize: 20,
      textDecorationLine: 'underline' },
  
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
    borderColor: 'black',
    borderWidth: 1 },
  
  container: {
    flex: 1, 
    padding: 16, 
    paddingTop: 15,
    alignSelf: 'stretch' 
    },
  
  head: { 
    height: 40, 
    backgroundColor: 
    '#f1f8ff' },

  text: { 
    margin: 6 }

})