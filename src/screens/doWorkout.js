import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity, TextInput, Alert, BackHandler} from 'react-native';
import { AppConsumer } from '../context/app-context';

import { FAB } from 'react-native-paper';
import { HeaderBackButton } from '@react-navigation/stack';

import InputModal from '../components/modal'
import { TapGestureHandler } from 'react-native-gesture-handler';
import globalStyles from '../global-styles/styles';

//screen for user to store results of in progress workout instance
export default class DoWorkoutScreen extends Component {
  constructor(props){
    super()
    console.log(props.route.params)
    var results = props.route.params.workout
    this.state = {modalIsEditing: -1, isModalVisible: false, modalReps: '', modalWeight: '', workoutResults: results}
  }

  componentDidMount() {

    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
    this.props.navigation.setOptions({
        headerLeft: () => (
          <HeaderBackButton onPress={() => this.backAction()}/>
        )
      })
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  backAction = () => {
    Alert.alert("Are you sure?", "Would you like to save your workout progress before quitting?", [
      { text: "Cancel",
        onPress: () => null,
        style: "cancel"},
      
      { text: "Quit",
        onPress: () => {this.props.navigation.goBack()}},
      
      { text: "Save & Quit", onPress: () => {
        this.props.route.params.context.saveWorkoutInProgress(this.state.workoutResults, this.props.route.params.index)
        this.props.navigation.goBack() }}
    ]);
    return true;
  };

  updateModalWeight = (val) => {
    this.setState({modalWeight: val})
  }

  updateModalReps = (val) => {
    this.setState({modalReps: val})
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

  setExerciseResults = (reps, weight) => {
    const setNum = this.state.modalIsEditing
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
    const name = this.props.route.params.name
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

            <InputModal isVisible={this.state.isModalVisible} viewReps = {this.state.modalReps} viewWeight = {this.state.modalWeight}
                        dismiss = {() => this.dismissModal()} cleanNum = {(e) => this.cleanNum(e)} updateMW = {(val) => this.updateModalWeight(val)}
                        updateReps = {(val) => this.updateModalReps(val)} saveResults = {(r, w) => this.setExerciseResults(r, w)}/>
          
          
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
              
            <FAB style={globalStyles.fab} large icon="plus"
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
  row: {
   flexDirection : 'row',
  },
})