import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, TouchableOpacity, Image } from 'react-native';

export default class WorkoutInput extends Component {
    constructor(props){
        super()
        var exercises = props.value
        this.state = {values: exercises, rows: exercises.length}
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

    deleteRow = (index) => {
      var exerciseList = this.state.values
      exerciseList.splice(index, 1)
      this.setState({values: exerciseList})
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

    render(){
        return (
          <View style={{flex: 1}}>

            
              <FlatList keyExtractor={(item, index) => item.key} removeClippedSubviews={false} data={this.state.values} renderItem={({ item, index }) =>(
                <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'flex-start'}}>
                  <TextInput style={styles.nameText} value={item.name} maxLength={25} placeholder='Exercise'
                    onChangeText={(text) => this.handleChange(0, text, index)}/>
                  <TextInput style={styles.numText} value = {item.sets.toString()} maxLength={4} placeholder='Sets'
                    keyboardType={'numeric'} onChangeText={(text) => this.handleChange(1, text, index)}
                    onEndEditing={(event) => {
                      const cleanInput = this.cleanNum(event)
                      this.handleChange(1, cleanInput, index)
                    }}/> 
                  <TextInput style={styles.numText} value = {item.reps.toString()} maxLength={4} placeholder='Reps'
                    keyboardType={'numeric'} onChangeText={(text) => this.handleChange(2, text, index)}
                    onEndEditing={(event) => {
                      const cleanInput = this.cleanNum(event)
                      this.handleChange(2, cleanInput, index)
                    }}/>
                  <TouchableOpacity onPress={() => this.deleteRow(index)}>
                    <View style={styles.imagePadding}>
                      <Image style={styles.image} source={require('../assets/delete.png')}/>
                    </View>
                  </TouchableOpacity>
                </View>
              )}/>
            
            
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Button title="Add Row" onPress={() => this.addRow()}/>
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
      marginLeft: '10%' },
    image: {
      width: 24,
      height: 24,
      marginLeft:'10%'
  },
})

