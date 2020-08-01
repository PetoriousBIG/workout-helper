import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//a tab for letting the user make customization and contains app info
export default function Options() {
  return (
    <View style = {styles.topView}>
      
          <Text>Hello World</Text>

    </View>
  )
}

const styles = StyleSheet.create({

  topView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },

})