import React from 'react';
import { View, Text, Alert } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { helper } from '../Data/ApiHelper';

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

    /*
    datasta erotetaan taulu, jossa id:t
    id:t annetaan https://api.guildwars2.com/v2/achievements/{idt} paremetrina -> taulukko, jossa questien varsinaiset tiedot
    mapataan listaan
    */

    getData = (url) => {

        //template = the "shape" of the expected object
        let result = fetch(url)
            .then((response) => response.json())
            .then((responseJson) => { 
                return responseJson
            })

            .catch((error) => { 
                Alert.alert(error);
            });
        
        
        return result;

    }

  
    async componentDidMount (){
       
        //fetching today's quest ids
        const Dailyurl = 'https://api.guildwars2.com/v2/achievements/daily';
        const data_ids = await this.getData(Dailyurl);

        //separating ids
        
        //fetching today's quests based on id's


        this.setState({
            data:data_ids //TODO!!!
        })
        

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

