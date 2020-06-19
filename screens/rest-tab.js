import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import CountDown from 'react-native-countdown-component';

export default function Rest() {
  const [timerRunning, setTimerRunning] = useState(false) 
  const [timer, setTime] = useState(300)
  const [viewKey, setViewKey] = useState(0)
  const [min, setMin] = useState('03')
  const [sec, setSec] = useState('00')

  const changeState = () => {
    
    const time = (parseInt(min) * 60) + parseInt(sec)
    
    setTime(time)
    var vk = viewKey
    setViewKey(vk+1)
  }

  const fixString = (num) => {
    if(num < 0){
      num = 0
    }

    if(num > 9){
      return num.toString()
    }
    else{
      return '0'.concat(num.toString())
    }
  }

  const minUp = () => {
    var m = parseInt(min)+1
    const s = fixString(m)
    setMin(s)
  }
  
  const minDown = () => {
    var m = parseInt(min)-1
    const s = fixString(m)
    setMin(s)
  }

  const secDown = () => {
    var m = parseInt(sec)-1
    const s = fixString(m)
    setSec(s)
  }

  const secUp = () => {
    var m = parseInt(sec)+1
    const s = fixString(m)
    setSec(s)
  }

  return (
    <View style = {styles.container} key = {viewKey}>
      
      <Text style = {styles.instructionText}>Tap the timer to start and pause </Text>
      <CountDown until={timer} onFinish={() => alert('Rest Time is over! Back at it!')}
          onPress={() => setTimerRunning(!timerRunning)} size={20}
          running = {timerRunning} timeToShow = {['M', 'S']} size = {50}/>

      <View style={{marginTop: 15}}>
        
        <View style={styles.horizontalView}>
          <TouchableOpacity style={{marginLeft: 11}} onPress={() => minUp()}>
            <Text style={styles.toPlusAndMinus}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 32}} onPress={() => secUp()}>
            <Text style={styles.toPlusAndMinus}>+</Text>
          </TouchableOpacity>

        </View>
        
        <View style={styles.horizontalView}>
          <Text style={styles.timeText}>{min}</Text>
          <Text style={styles.timeText}>:</Text>
          <Text style={styles.timeText}>{sec}</Text>
        </View>

        <View style={styles.horizontalView}>
          <TouchableOpacity style={{marginLeft: 18}} onPress={() => minDown()}>
            <Text style={styles.toPlusAndMinus}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft: 43}} onPress={() => secDown()}>
            <Text style={styles.toPlusAndMinus}>-</Text>
          </TouchableOpacity>

        </View>

      </View>

      <TouchableOpacity onPress = {() => changeState()}>
        <View style = {styles.editTimeView}>
          <Text style = {styles.toButton}>Time Reset</Text>
         </View>
      </TouchableOpacity>
      
    </View>
    
  )
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginTop: '15%'
},

editTimeView: {
   backgroundColor: '#FC766AFF' ,
   borderStyle: 'solid',
   borderWidth: 10,
   borderColor: '#FC766AFF' ,
   borderRadius: 15
},

instructionText: {
  marginBottom: 30,
  fontSize: 25
},

toButton: {
  fontSize: 35,
  color: '#5B84B1FF'
},

horizontalView: {
  flexDirection: 'row'
},

timeText: {
  fontSize: 50
},

toPlusAndMinus: {
   fontSize: 50,
   color: '#31DCF7'
}
})