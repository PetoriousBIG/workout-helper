import * as React from 'react'
import { AppConsumer } from '../context/app-context';
import { NavigationContainer, Button } from '@react-navigation/native'
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from '../screens/home-tab.js';
import Rest from '../screens/rest-tab.js';
import Options from '../screens/options.js';
import WOScreen from '../screens/workout-screen.js'
import DoWorkoutScreen from '../screens/doWorkout.js';
import Records from '../screens/records.js';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function TopLevelTabsNav() {
  return (
    <AppConsumer>
    {(context) => (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
            activeTintColor: context.selectedColor.atColor,
            inactiveTintColor: context.selectedColor.itColor,
            style: {backgroundColor: context.selectedColor.bg}
          }}>
          <Tab.Screen name = 'Workouts' component={StackNav}/>
          <Tab.Screen name = 'Rest' component={Rest}/>
          <Tab.Screen name = 'Records' component={Records}/>
          <Tab.Screen name = 'Options' component={Options}/>
        </Tab.Navigator>
      </NavigationContainer>
    )}
    </AppConsumer>
  );
}

function StackNav() {
    return(
       
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name = 'Workouts' component={Home}/>
        <Stack.Screen name = 'New Workout' component={WOScreen} 
          options={
            ({ route }) => ({ title: route.params.item.name })
            }/>
        <Stack.Screen name = 'Do Workout' component={DoWorkoutScreen}/>
      </Stack.Navigator>
    
    )
}

export default TopLevelTabsNav