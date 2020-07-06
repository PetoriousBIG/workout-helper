import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import Set from '../model/set.js';

//screen for user to store results of in progress workout instance
export default function DoWorkoutScreen({route, navigation}) {
  const [modalIsEditing, setModalIsEditing] = useState(-1)
  const [isModalVisible, setIsModalVisable] = useState(false)
  
  const wo = route.params.item.exercises
  var sets = []
  var i
  for(i = 0; i < wo.length; i++){
    const nextExercise = wo[i]
    const numSets = nextExercise.sets
    const goalReps = nextExercise.reps
    var thisExerciseSets = []
    var j 
    for(j = 0; j < numSets; j++){
        thisExerciseSets.push(new Set(nextExercise.name, goalReps, 0, '', false ))
    }
    sets = sets.concat(thisExerciseSets)
  }

  return (
    <View>

      <Modal visible = {isModalVisible} presentationStyle= {'formSheet'} animationType={'fade'}>
        <TouchableOpacity onPress={() => setIsModalVisable(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>

      <FlatList data={sets}
                keyExtractor={(item, index) => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setIsModalVisable(true)}>
                        <View style = {styles.flatList}>
                            <Text style = {styles.text}>{item.exercise}: {item.completedReps}/{item.goalReps} @ {item.weight}</Text>
                        </View>
                    </TouchableOpacity>
                )}>
        
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  flatList: {
      padding: 15
  },
  text: {
      fontSize: 25
  }
})