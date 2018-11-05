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
                    "id": 0,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2"]
                  },
                ],
                "pvp": [
                  {
                    "id": 0,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2"]
                  },
                ],
                "wvw": [
                    {
                      "id": 0,
                      "level": { "min": 1, "max": 80 },
                      "required_access": ["GuildWars2"]
                    },
                ],
                "fractals": [
                {
                    "id": 0,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2"]
                },
                ],
                "special": [
                {
                    "id": 0,
                    "level": { "min": 1, "max": 80 },
                    "required_access": ["GuildWars2"]
                },
                ],
            }
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
                        this.state.data.wvw.map((item) => (
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