import React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Workout from '../model/workout.js';
import { AppConsumer } from '../context/app-context';
import { createStackNavigator } from '@react-navigation/stack';
import WOScreen from '../screens/workout-screen';
import { FAB } from 'react-native-paper';

//the workout list screen. this is the fist tab used in 
//top level tab navigator. this is the "Home" screen
export default function Home(props) {
  const { navigation } = props
  return (
    <AppConsumer>
    {(context) => (
      <View style={styles.container}>
        <FlatList data={context.workouts}
                  keyExtractor = {(item, index) => {return item.key}} 
                  renderItem={({ item }) => (
                      
          <TouchableOpacity onPress={() => alert(item.name) }>
            <View style={styles.row}>
                          
              <Text style={styles.rowText}>{item.name}</Text>
                          
                <View style={styles.rowbuttons}>
                  <TouchableOpacity onPress={ () => navigation.navigate('New Workout', {item, isNew: false})}>
                    <View style={styles.imagePadding}>
                      <Image style={styles.image} source={require('../assets/edit.png')}/>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => alert('delete ' + item.name)}>
                    <View style={styles.imagePadding}>
                      <Image style={styles.image} source={require('../assets/delete.png')}/>
                    </View>
                  </TouchableOpacity>
                </View>

            </View>
          </TouchableOpacity>)}/>
          <FAB style={styles.fab} large icon="plus"
              onPress={() => navigation.navigate('New Workout', {item: {name: "New Workout"}, isNew: true})}/>
      </View>)}
    </AppConsumer>
      
  )
}

const styles = StyleSheet.create({
  container : {
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: '5%',
    marginTop: '5%',
    marginRight: '5%',
    marginBottom: '5%'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch',
    backgroundColor: '#FF7394',
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1
  },
  rowText: {
    fontSize: 24
  },
  rowbuttons: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  image: {
    width: 24,
    height: 24,
  },
  imagePadding: {
    paddingRight: 10,
    paddingLeft: 10
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderColor: 'black',
    borderWidth: 1
  },
})
