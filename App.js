import React from 'react';
import { createStackNavigator } from 'react-navigation';
import WorldBosses from './src/Screens/WorldBosses';
import DailyQuests from './src/Screens/DailyQuests';

const RootStack = createStackNavigator(
  {
    WorldBosses: {screen: WorldBosses},
  },
  {
    initialRouteName: 'WorldBosses',
  }

);

export default class App extends React.Component {
  render () {
    return (
      <RootStack/>
    );
  }
}
