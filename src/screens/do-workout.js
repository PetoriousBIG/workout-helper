import React, { Component } from 'react';
import {  Text, View, FlatList, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { AppConsumer } from '../context/app-context';
import { FAB } from 'react-native-paper';
import { HeaderBackButton } from '@react-navigation/stack';

import InputModal from './modal'
import globalStyles from '../global-styles/styles';
import { cleanNum, createRecord, updateExerciseResult } from './code-behind/do-workout'

//screen for user to record results of in progress workout instance
export default class DoWorkoutScreen extends Component {
  constructor(props){
    super()
    this.state = {modalIsEditing: -1, isModalVisible: false, modalReps: '', modalWeight: '', workoutResults: props.route.params.workout}
  }

  //sets up the listener for Android hardware back button and
  //overwrites the header back button
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

  //cleanup function that undoes the hardware back button listener
  componentWillUnmount() {
    this.backHandler.remove();
  }

  //handles moving to the previous screen on the stack by
  //providing the user with the option of saving their progress before navigation back
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

  //the following 4 functions are supplied to the modal
  //to update this screen's state
  updateModalWeight = (val) => {
    this.setState({modalWeight: val})
  }

  updateModalReps = (val) => {
    this.setState({modalReps: val})
  }

  setExerciseResults = (reps, weight) => {
    this.setState({workoutResults: updateExerciseResult(this.state.workoutResults, this.state.modalIsEditing, reps, weight)})
  }

  dismissModal = () => {
    this.setState({modalReps: ''})
    this.setState({modalWeight: ''})
    this.setState({isModalVisible: false})
  }

  render() {
    return (
      <AppConsumer>
      {(context) => (
        <View style={globalStyles.topContainer}>

            <InputModal isVisible={this.state.isModalVisible} viewReps = {this.state.modalReps} viewWeight = {this.state.modalWeight}
                        dismiss = {() => this.dismissModal()} cleanNum = {(e) => cleanNum(e)} updateMW = {(val) => this.updateModalWeight(val)}
                        updateReps = {(val) => this.updateModalReps(val)} saveResults = {(r, w) => this.setExerciseResults(r, w)}/>
          
          
            <FlatList data={this.state.workoutResults}
                      keyExtractor={(item, index) => item.key}
                      renderItem={({ item, index }) => (
                          <TouchableOpacity onPress={() => {

                            //triggers the modal to appear and sets the flag
                            //for the item being edited
                            this.setState({modalIsEditing: index})
                            this.setState({isModalVisible: true})}}>
                              
                              <View style = {[{padding: 15, borderWidth: .5}, 
                                item.completedReps >= item.goalReps ? {backgroundColor: '#5EFCAD'} : {backgroundColor: '#FF7394'}]}>
                                  <Text style = {globalStyles.flatlistHeader}>{item.exercise}: {item.completedReps}/{item.goalReps} @ {item.weight}</Text>
                              </View>
                          </TouchableOpacity>)}/>
              
            <FAB style={globalStyles.fab} large icon="plus"
                  onPress={() => {
                    
                    //adds the new record to app storage and pop's this screen from the stack
                    const record = createRecord(this.props.route.params.name, this.state.workoutResults)
                    context.addRecord(record)
                    this.props.navigation.goBack()
                  }}/>
        </View>)}
      </AppConsumer>
    )
  }
}
