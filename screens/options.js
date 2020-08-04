import React from 'react';
import { Button, View,} from 'react-native';
import { AppConsumer } from '../context/app-context';

//a tab for letting the user make customization and contains app info
export default function Options() {
  return (
    <AppConsumer>
    {(context) => (
      <View style={{justifyContent: 'center', alignItems: "center"}}>
        <Button title="Clear App Data" onPress={() => context.clearAllData()}/>
      </View>
    )}
    </AppConsumer>
  )
}
