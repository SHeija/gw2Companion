import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import WorldBosses from './src/Screens/WorldBosses';
import DailyQuests from './src/Screens/DailyQuests';
import Settings from './src/Screens/Settings';

//topbar navigator inside a stack navigator

const RootStack = createStackNavigator({
  MyTab: {
    screen: createMaterialTopTabNavigator({ 
      WorldBosses: {screen: WorldBosses},
      DailyQuests: {screen: DailyQuests},
      Settings: {screen: Settings},
     },
     
     ),
    
    navigationOptions: { title: 'GW2Companion' }
 }
})



export default class App extends React.Component {

  render () {
    return (
    
            <RootStack/>


    );
  }
}
