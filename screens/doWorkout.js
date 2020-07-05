import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

//a tab for letting the user make customization and contains app info
export default function DoWorkoutScreen({route, navigation}) {
  const wo = route.params.item.exercises
  var sets = []
  var i
  for(i = 0; i < wo.length; i++){
    const nextExercise = wo[i]
    const numSets = nextExercise.sets
    var j 
    for(j = 0; j < numSets; j++){
        console.log(nextExercise.name + ' ' + (j+1))
    }
  }
  
  
  return (
    <View style = {styles.topView}>
    </View>
  )
}

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'center'
  },
})