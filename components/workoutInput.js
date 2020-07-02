import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput, Button} from 'react-native';

export default class WorkoutInput extends Component {
    constructor(props){
        super()
        var values = props.value
        var numRows = values.length
        this.state = {values: values, rows: numRows}
    
    }

    render(){
        return (
          <View style={{flex: 1}}>

            <View style={styles.listContainer}>
            
            </View>
            
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
    }
})

