import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import Workout from '../model/workout.js';
import { AppConsumer } from '../context/app-context';
import { FAB } from 'react-native-paper';
import globalStyles from '../global-styles/styles'
import Set from '../model/set'

//the workout list screen. this is the fist tab used in 
//top level tab navigator. this is the "Home" screen
export default function Home(props) {
  const { navigation } = props

  const buildEmptyWorkout = (input) =>{
    const wo = input
    var sets = []
    var i
    for(i = 0; i < wo.length; i++){
      const nextExercise = wo[i]
      const numSets = nextExercise.sets
      const goalReps = nextExercise.reps
      var thisExerciseSets = []
      var j 
      for(j = 0; j < numSets; j++){
          thisExerciseSets.push(new Set(nextExercise.name, goalReps, 0, ''))
      }
      sets = sets.concat(thisExerciseSets)
    }
    return sets
  }

  return (
    <AppConsumer>
    {(context) => (
      <View style={[globalStyles.topContainer, {marginLeft: "5%", marginRight: '5%'}]}>
        <FlatList data={context.workouts} style={globalStyles.flatlist}
                  renderItem={({ item, index }) => (
                      
          <TouchableOpacity onPress={() => {
            if (context.workoutIndex == -1){
              const emptyWorkout = buildEmptyWorkout(item.exercises)
              navigation.navigate('Do Workout', {workout: emptyWorkout, name: item.name, index, context})
            }
            else if (index != context.workoutIndex){
              Alert.alert("Start New Workout?", "You have progress from a different workout saved. Would you like to " +
              "erase previous progress and start a new workout?", 
              [ {text: "CANCEL",
                 style: "cancel"},
                {text: "OK",
                onPress: () => {
                  context.deleteWorkoutInProgress()
                  const emptyWorkout = buildEmptyWorkout(item.exercises)
                  navigation.navigate('Do Workout', {workout: emptyWorkout, name: item.name, index, context})
                }}])
            }
            else {
              Alert.alert("Continue?", "You already have progress from this workout saved. Would you like " + 
              "continue where you left off?",
              [{text: "CANCEL",
               style: "cancel"},
               {text: "START OVER",
                onPress: () => {
                context.deleteWorkoutInProgress()
                const emptyWorkout = buildEmptyWorkout(item.exercises)
                navigation.navigate('Do Workout', {workout: emptyWorkout, name: item.name, index, context})
               }},
               {text: "CONTINUE",
                onPress: () => {
                  const inProgressWorkout = context.workoutInProgress
                  navigation.navigate('Do Workout', {workout: inProgressWorkout, name: item.name, index, context})
                }}])

            }
            }}>

            <View style={[globalStyles.row, {borderWidth: 2.5,
                                             borderRadius: 15,
                                             paddingVertical: 12,
                                             backgroundColor: '#D3D3D3'}]}>
                          
              <Text style={globalStyles.flatlistHeader}>{item.name}</Text>
                          
                <View style={globalStyles.imageButtonRow}>
                  <TouchableOpacity onPress={ () => {
                    
                    const itemDeepCopy = JSON.parse(JSON.stringify(item))
                    navigation.navigate('New Workout', {item: itemDeepCopy, isNew: false})}}>
                    
                    <View>
                      <Image style={globalStyles.imageButton} source={require('../assets/edit.png')}/>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => {
                    if(index == context.workoutIndex){
                      Alert.alert("Are You Sure?", "You still have a workout of this type saved. If you continue, " +
                                  "it will be deleted. Is that okay?",
                                  [{text: "CANCEL",
                                    style: "cancel"},
                                   {text: "CONTINUE",
                                    onPress: () => {
                                      context.deleteWorkoutInProgress()
                                      context.deleteWorkout(item.key)
                                    }}])}
                    else{
                      context.deleteWorkout(item.key)
                    }
                    }}>

                    <View>
                      <Image style={globalStyles.imageButton} source={require('../assets/delete.png')}/>
                    </View>
                  </TouchableOpacity>
                </View>

            </View>
          </TouchableOpacity>)}/>

          <FAB style = {globalStyles.fab} large icon="plus"
              onPress={() => 
              navigation.navigate('New Workout', {item: new Workout('New Workout', 0, [{name: '', sets: '', reps: ''}]), isNew: true})}/>
      </View>)}
    </AppConsumer>
      
  )
}