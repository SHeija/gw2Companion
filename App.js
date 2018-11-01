import React from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements'
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorldBosses from './src/Screens/WorldBosses';
import DailyQuests from './src/Screens/DailyQuests';

const RootStack = createMaterialTopTabNavigator(
  {
    WorldBosses: {screen: WorldBosses},
    DailyQuests: {screen: DailyQuests}
  },
  {
    initialRouteName: 'WorldBosses',
    tabBarPosition: 'bottom', //yes, I used toptab and then put it on the bottom.
  }

);

export default class App extends React.Component {
  render () {
    return (
    
            <RootStack/>


    );
  }
}
