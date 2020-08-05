import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import Workout from '../model/workout.js';
import { AppConsumer } from '../context/app-context';
import { FAB } from 'react-native-paper';
import globalStyles from '../global-styles/styles'

//the workout list screen. this is the fist tab used in 
//top level tab navigator. this is the "Home" screen
export default function Home(props) {
  const { navigation } = props
  return (
    <AppConsumer>
    {(context) => (
      <View style={[globalStyles.topContainer, {marginLeft: "5%", marginRight: '5%'}]}>
        <FlatList data={context.workouts} style={globalStyles.flatlist}
                  renderItem={({ item, index }) => (
                      
          <TouchableOpacity onPress={() => {
            if (context.workoutIndex == -1){
              navigation.navigate('Do Workout', {item, index, context})
            }
            else if (index != context.workoutIndex){
              Alert.alert("Start New Workout?", "You have progress from a different workout saved. Would you like to " +
              "erase previous progress and start a new workout?", 
              [ {text: "CANCEL",
                 style: "cancel"},
                {text: "OK",
                onPress: () => {
                  context.deleteWorkoutInProgress()
                  navigation.navigate('Do Workout', {item, index, context})
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
                  <TouchableOpacity onPress={() => context.deleteWorkout(item.key)}>
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