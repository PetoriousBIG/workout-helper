import React, { useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CountDown from 'react-native-countdown-component';

export default function Rest() {
  const [timerRunning, setTimerRunning] = useState(false) 
  const [timer, setTime] = useState(300)
  const [viewKey, setViewKey] = useState(0)

  const changeState = () => {
    setTime(180)
    var vk = viewKey
    setViewKey(vk+1)
  }

  return (
    <View style = {styles.container} key = {viewKey}>
      <CountDown until={timer} onFinish={() => alert('finished')}
          onPress={() => setTimerRunning(!timerRunning)} size={20}
          running = {timerRunning} timeToShow = {['M', 'S']} showSeperator/>

      <Button title={'3:00'} onPress = {() => changeState()}/>
    </View>
  )
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  justifyContent: 'center'
}

})