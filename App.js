import React from 'react';
import { createStackNavigator, createMaterialTopTabNavigator,  } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import WorldBosses from './src/Screens/WorldBosses';
import DailyQuests from './src/Screens/DailyQuests';
import Settings from './src/Screens/Settings';
import Commerce from './src/Screens/Commerce';

console.disableYellowBox = true;
/*
//topbar navigator inside a stack navigator
const RootStack = createStackNavigator({
  MyTab: {
    screen: createMaterialBottomTabNavigator({ 
      WorldBosses: {screen: WorldBosses},
      DailyQuests: {screen: DailyQuests},
      Commerce: {screen: Commerce},
      Settings: {screen: Settings},
     },
     
     ),
    
    navigationOptions: { 
      title: 'GW2Companion',
      initialRouteName: 'Settings',
     }
 }
})
*/


 const Tabs = createMaterialTopTabNavigator({
    WorldBosses: {
      screen: WorldBosses,
    },
    DailyQuests: {screen: DailyQuests},
    Commerce: {screen: Commerce},
    Settings: {screen: Settings},
  }, {
    initialRouteName: 'Commerce',
    tabBarPosition: 'bottom',
    tabBarOptions: {
      labelStyle: {
        fontSize: 10,
      },
      tabStyle: {
        width: '100%',
      },
      style: {
        backgroundColor: '#C2185B',
      },
    },
    
});

export default class App extends React.Component {

  

  render () {
    return (
    
            <Tabs/>


    );
  }
}
