import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, ScrollView} from 'react-native';

export default class WorkoutInput extends Component {
    constructor(props){
        super()
        this.state = {values: props.value.exercises, rows: props.numRows}
    }

    handleChange = (field, input, index) =>{
      var exerciseList = this.state.values
      var exercise = exerciseList[index]

      switch(field){
        case 0:
          exercise.name = input
          break;
        case 1:
          exercise.sets = input
          break;
        case 2:
          exercise.reps = input
          break;
        default:
          alert('Something broke!')
          break;
      }

      exerciseList[index] = exercise
      this.setState({values: exerciseList})
    }

    addRow = () => {
      var dummy = {name: '', sets: '', reps: ''}
      var exerciseList = this.state.values
      exerciseList.push(dummy)
      this.setState({values: exerciseList})
    }

    render(){
        return (
          <View style={{flex: 1}}>

            <ScrollView style={styles.listContainer}>
              <FlatList keyExtractor={(item, index) => item.key} data={this.state.values} renderItem={({ item, index }) =>(
                <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'flex-start'}}>
                  <TextInput style={styles.nameText} value={item.name} maxLength={25}
                    onChangeText={(text) => this.handleChange(0, text, index)} placeholder='Exercise'/>
                  <TextInput style={styles.numText} value = {item.sets.toString()} maxLength={4}
                    onChangeText={(text) => this.handleChange(1, text, index)} placeholder='Sets'/> 
                  <TextInput style={styles.numText} value = {item.reps.toString()} maxLength={4}
                    onChangeText={(text) => this.handleChange(2, text, index)} placeholder='Reps'/>
                </View>
              )}/>
            </ScrollView>
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{margin: '2%'}}><Button title="Add Row" onPress={() => this.addRow()}/></View>
              <View style={{margin: '2%'}}><Button title="Remove Row"/></View>
            </View>

          </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer:{
        flex: 3,
        borderWidth: 1
    },
    nameText: {
      fontSize: 20,
      borderBottomWidth: 1,
      textAlign: 'center',
      width: 120 },
    numText: {
      fontSize: 20,
      borderBottomWidth: 1,
      textAlign: 'center',
      width: 15,
      marginLeft: '15%' },
})

