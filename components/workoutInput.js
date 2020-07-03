import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, ScrollView} from 'react-native';

export default class WorkoutInput extends Component {
    constructor(props){
        super()
        this.state = {values: props.value.exercises, rows: props.numRows}
        console.log(this.state.values)
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
          break;
      }

      exerciseList[index] = exercise
      this.setState({values: exerciseList})
    }

    render(){
        return (
          <View style={{flex: 1}}>

            <ScrollView style={styles.listContainer}>
              <FlatList keyExtractor={(item, index) => item.key} data={this.state.values} renderItem={({ item, index }) =>(
                <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'space-around'}}>
                  <TextInput style={styles.inputText} value={item.name}
                    onChangeText={(text) => this.handleChange(0, text, index)}/>
                  <TextInput style={styles.inputText} value = {item.sets.toString()}
                    onChangeText={(text) => this.handleChange(1, text, index)}/>
                  <TextInput style={styles.inputText} value = {item.reps.toString()}
                    onChangeText={(text) => this.handleChange(2, text, index)}/>
                </View>
              )}/>
            </ScrollView>
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <View style={{margin: '2%'}}><Button title="Add Row"/></View>
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
    inputText: {
      fontSize: 20,
      borderBottomWidth: 1 },
})

