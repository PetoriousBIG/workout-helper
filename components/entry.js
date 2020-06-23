import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AppConsumer } from '../context/app-context';
import Home from '../screens/home-tab.js';
import Rest from '../screens/rest-tab.js';
import Options from '../screens/options.js';

const Tab = createMaterialTopTabNavigator();

//sets up the tab navigator, used for navigating between the main pages of the app
export default function Entry() {
  return (
    <AppConsumer>
    {(context) => (
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{
            activeTintColor: context.selectedColor.atColor,
            inactiveTintColor: context.selectedColor.itColor,
            style: {backgroundColor: context.selectedColor.bg}
          }}>
          <Tab.Screen name='Workouts' component={Home}/>
          <Tab.Screen name='Rest' component={Rest}/>
          <Tab.Screen name = 'Options' component={Options}/>
        </Tab.Navigator>
      </NavigationContainer>
    )}
    </AppConsumer>
  );
}