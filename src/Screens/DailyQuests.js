import React from 'react';
import { View, Text, Alert } from 'react-native';
import { List, ListItem, } from 'react-native-elements'


export default class DailyQuests extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {data:
            {
                "pve": [
                  {
                    "id": 1984,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2","HeartOfThorns"]
                  },
                  {
                    "id": 1951,
                    "level": { "min": 11, "max": 80 },
                    "required_access": ["GuildWars2"]
                  },
                  {
                    "id": 2945,
                    "level": { "min": 80, "max": 80 },
                    "required_access": ["HeartOfThorns"]
                  },
                ],
                "pvp": [
                  {
                    "id": 1858,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2","HeartOfThorns"]
                  },
                ],
            }
    }

    getData = (url) => {
      
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
          this.setState({data: responseJson});
        })
        .catch((error) => { 
          Alert.alert(error); 
        });    
      }

    componentDidMount (){
        const dailyApi = 'https://api.guildwars2.com/v2/achievements/daily';
        this.getData(dailyApi)
    }

    render () {
        return (
            <View>
                <List>
                    {
                        this.state.data.pve.map((item) => (
                        <ListItem
                            key={item.id}
                            title={item.id}
                        />
                        ))
                    }
                </List>
            </View>
        );
    }
        
}