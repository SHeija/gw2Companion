import React from 'react';
import { createMaterialTopTabNavigator,  } from 'react-navigation';
import WorldBosses from './src/Screens/WorldBosses';
import DailyQuests from './src/Screens/DailyQuests';
import Settings from './src/Screens/Settings';
import Commerce from './src/Screens/Commerce';

console.disableYellowBox = true;

 const Tabs = createMaterialTopTabNavigator({
    WorldBosses: {
      screen: WorldBosses,
    },
    DailyQuests: {screen: DailyQuests},
    Commerce: {screen: Commerce},
    Settings: {screen: Settings},
  }, {
    initialRouteName: 'WorldBosses',
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
