import React from 'react';
import { Text, View, TouchableOpacity, Modal, TextInput} from 'react-native';
import globalStyles from '../global-styles/styles'

//the modal for updating the completed reps and weight for
//exercises on the do-workout screen

export default function InputModal(props){
    return (
        <Modal animationType = {"fade"} transparent = {true}
                visible = {props.isVisible}>
          
          <View style={{flex: 1, justifyContent: "center", padding: 30, alignItems: "center", backgroundColor: '#00000080'}}>
            <View style={{backgroundColor: "#fff", padding: 50, borderRadius: 25, borderWidth: 1}}>
                
                <Text style={{fontSize: 24}}>Enter the weight and reps completed for this exercise </Text>

                <View style={globalStyles.row}>
                  
                  <TextInput style={globalStyles.numberInput} maxLength={4} placeholder='Reps' keyboardType={'numeric'} value={props.viewReps}
                   onChangeText={(text) => props.updateReps(text)} onEndEditing={(event) => {

                    //clean input and update rep for exercise at index given by flag
                    //on do-workout screen
                    const val = props.cleanNum(event)
                    props.updateReps(val)}}/>
                  
                  <TextInput style={globalStyles.numberInput} maxLength={4} placeholder="Weight" keyboardType={'numeric'} value={props.viewWeight}
                   onChangeText={(text) => props.updateMW(text)} onEndEditing={(event) => {

                    //clean input and update weight for exercise at index given by flag
                    //on do-workout screen
                    const val = props.cleanNum(event)
                    props.updateMW(val)}}/>
                
                </View>

                <View style={globalStyles.row}>

                  <TouchableOpacity onPress={() => {
                      props.saveResults(props.viewReps, props.viewWeight)     
                      props.dismiss()}}>
                    
                    <View>
                      <Text>Save</Text>
                    </View>
                  
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => {props.dismiss()}}>
                    <View>
                      <Text>Dismiss</Text>
                    </View>
                  </TouchableOpacity>

                </View>
            
            </View>
          </View> 
        
        </Modal>
    )
}