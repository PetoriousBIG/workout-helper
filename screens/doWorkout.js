import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, TextInput} from 'react-native';
import { AppConsumer } from '../context/app-context';

import Set from '../model/set.js';
import Record from '../model/record.js';
import { FAB } from 'react-native-paper';

//screen for user to store results of in progress workout instance
export default class DoWorkoutScreen extends Component {
  constructor(props){
    super()
    var results = this.getInitialVals(props.route.params.item.exercises)
    this.state = {modalIsEditing: -1, isModalVisible: false, modalReps: '', modealWeight: '', workoutResults: results}
  }
  

  getInitialVals = (input) =>{
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


  cleanNum = (e) => {
    var inputAsNum = Math.floor(Number(e.nativeEvent.text))
    if (inputAsNum < 1){
      const one = 1
      return one.toString()
    }
    else if (isNaN(inputAsNum)){
      const one = 1
      return one.toString()
    }
    return inputAsNum.toString()
  }

  setExerciseResults = (setNum, reps, weight) => {
    var woResultsCopy = this.state.workoutResults
    var set = woResultsCopy[setNum]
    set.completedReps = reps
    set.weight = weight
    woResultsCopy[setNum] = set
    this.setState({workoutResults: woResultsCopy})
  }

  dismissModal = () => {
    this.setState({modalReps: ''})
    this.setState({modalWeight: ''})
    this.setState({isModalVisible: false})
  }

  createBody = () => {
    var body = ""
    const results = this.state.workoutResults
    results.forEach(element => {
      body += element.exercise + " " + element.completedReps + "/" + element.goalReps + " @ " + element.weight + "\n"
    })
    return body
  }

  createHeader = () => {
    const name = this.props.route.params.item.name
    const now = new Date()
    const nowString = now.getUTCMonth() + "/" + now.getUTCDate() + "/" + now.getUTCFullYear()
    return name + " " + nowString
  }

  saveChanges = () => {
    this.setExerciseResults(this.state.modalIsEditing, this.state.modalReps, this.state.modalWeight)
    this.dismissModal()
  }

  render() {
    return (
      <AppConsumer>
      {(context) => (
        <View style={styles.container}>

          <Modal animationType = {"slide"} transparent = {false}
                visible = {this.state.isModalVisible}>
                  
            <View style = {styles.modal}>
              <Text style = {styles.text}>Set weight and reps:</Text>
                <View style={styles.row}>
                  <Text style={styles.text}>Weight: </Text>
                  <TextInput style={styles.numText} value = {this.state.modalWeight} maxLength={4} placeholder='lbs'
                    keyboardType={'numeric'} onChangeText={(text) => this.setState({modalWeight: text})}
                    onEndEditing={(event) => {
                      const cleanInput = this.cleanNum(event)
                      this.setState({modalWeight: cleanInput})}}/>
                </View>
                <View style={styles.row}>
                  <Text style={styles.text}>Reps: </Text>
                  <TextInput style={styles.numText} value = {this.state.modalReps} maxLength={4} placeholder='Reps'
                    keyboardType={'numeric'} onChangeText={(text) => this.setState({modalReps: text})}
                    onEndEditing={(event) => {
                      const cleanInput = this.cleanNum(event)
                      this.setState({modalReps: cleanInput})}}/>
                </View>
              <View style={styles.row}>
                <TouchableOpacity onPress = {() => {
                  this.saveChanges()}}>
                  <View style={{marginRight: '5%'}}>  
                    <Text style = {styles.text}>Save</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress = {() => {
                  this.dismissModal()}}>
                  <View styles={{marginLeft: '5%'}}>  
                    <Text style = {styles.text}>Dismiss</Text>
                  </View>
                </TouchableOpacity>
              </View>
                      
            </View>
            </Modal>
          
          
            <FlatList data={this.state.workoutResults}
                      keyExtractor={(item, index) => item.key}
                      renderItem={({ item, index }) => (
                          <TouchableOpacity onPress={() => {
                            this.setState({modalIsEditing: index})
                            this.setState({isModalVisible: true})}}>
                              
                              <View style = {[styles.flatList, 
                                item.completedReps >= item.goalReps ? {backgroundColor: '#5EFCAD'} : {backgroundColor: '#FF7394'}]}>
                                  <Text style = {styles.text}>{item.exercise}: {item.completedReps}/{item.goalReps} @ {item.weight}</Text>
                              </View>
                          </TouchableOpacity>)}/>
              
            <FAB style={styles.fab} large icon="plus"
                  onPress={() => {
                    const header = this.createHeader()
                    const body = this.createBody()
                    context.addRecord(header, body)
                    this.props.navigation.goBack()
                  }}/>
        </View>)}
      </AppConsumer>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "flex-start",

  },
  flatList: {
      padding: 15,
      borderWidth: .5
  },
  text: {
      fontSize: 25
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  row: {
   flexDirection : 'row',
  },
  numText: {
    fontSize: 25,
    borderBottomWidth: 1,
    textAlign: 'center',
    width: 15,
    marginLeft: '10%' },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderColor: 'black',
    borderWidth: 1,
  }
})