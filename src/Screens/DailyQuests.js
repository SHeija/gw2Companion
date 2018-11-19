import React from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { getData } from '../Data/ApiHelper';

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
    id:t annetaan https://api.guildwars2.com/v2/achievements?ids=1,2,3 paremetrina -> objekti, jossa questien varsinaiset tiedot
    mapataan listaan
        */

    getInfo = (object) => {
        //object = the "category" being fetched
        //separating ids
        let idstring = '';
        for (let i = 0; i<Object.keys(object).length; i++){
            idstring = idstring + object[i].id +',';
        }

        //fetching today's quests based on id's

        const url = 'https://api.guildwars2.com/v2/achievements?ids='+idstring
        return getData(url);

    }
  
    async componentDidMount (){
       
        //fetching today's quest ids
        const Dailyurl = 'https://api.guildwars2.com/v2/achievements/daily';
        const data_ids = await getData(Dailyurl);
        
        //creating a temporary copy of this.state.data and inserting info
        let data = this.state.data;
        data.pve = await this.getInfo(data_ids.pve);
        data.pvp = await this.getInfo(data_ids.pvp);
        data.wvw = await this.getInfo(data_ids.wvw);
        data.fractals = await this.getInfo(data_ids.fractals);
        data.special = await this.getInfo(data_ids.special);

        this.setState({
            data:data
        })
        

    }
    
   
    render () {
        return (
            <View>
                <ScrollView>
                    <List>
                        {
                            this.state.data.pve.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                subtitle={item.requirement}
                                subtitleNumberOfLines = {5}
                                hideChevron
                            />
                            ))
                        }
                    </List>
                    <List>
                        {
                            this.state.data.pvp.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                subtitle={item.requirement}
                                subtitleNumberOfLines = {5}
                                hideChevron

                            />
                            ))
                        }
                    </List>
                    <List>
                        {
                            this.state.data.wvw.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                subtitle={item.requirement}
                                subtitleNumberOfLines = {5}
                                hideChevron

                            />
                            ))
                        }
                    </List>
                    <List>
                        {
                            this.state.data.fractals.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                subtitle={item.requirement}
                                subtitleNumberOfLines = {5}
                                hideChevron

                            />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }
        
}
