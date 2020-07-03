import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button, ScrollView} from 'react-native';

export default class WorkoutInput extends Component {
    constructor(props){
        super()
        this.state = {values: props.value.exercises, rows: props.numRows}
        console.log(this.state.values)
    }

    render(){
        return (
          <View style={{flex: 1}}>

            <ScrollView style={styles.listContainer}>
              <FlatList keyboardDismissMode='none' data={this.state.values} renderItem={({ item }) =>(
                <View style = {{flexDirection: 'row', padding: 5, justifyContent: 'space-around'}}>
                  <TextInput style={styles.inputText} value={item.name}/>
                  <TextInput style={styles.inputText} value = {item.sets.toString()}/>
                  <TextInput style={styles.inputText} value = {item.reps.toString()}/>
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

