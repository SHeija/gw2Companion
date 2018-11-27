import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { getData } from '../Data/ApiHelper';

export default class DailyQuests extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {settings : {}, data:{},  loading:true, }
    }

    static navigationOptions = {
        title: 'Daily Quests',
      };

    getInfo = (object) => {
        //object = the "category" being fetched, e.g "pvp"
        //separating ids
        let idstring = '';
        for (let i = 0; i<Object.keys(object).length; i++){
            idstring = idstring + object[i].id +',';
        }

        //fetching today's quests based on id's

        const url = 'https://api.guildwars2.com/v2/achievements?ids='+idstring
        return getData(url);

    }
  
    updateList = async () => {

        //fetching today's quest ids
        const Dailyurl = 'https://api.guildwars2.com/v2/achievements/daily';
        const data_ids = await getData(Dailyurl);
        
        //fetching quest info one by one
        let data = {};
        data.pve = await this.getInfo(data_ids.pve);
        data.pvp = await this.getInfo(data_ids.pvp);
        data.wvw = await this.getInfo(data_ids.wvw);
        data.fractals = await this.getInfo(data_ids.fractals);
        data.special = await this.getInfo(data_ids.special);

        this.setState({
            data:{...this.state.data, ...data}
        },  () => {
            this.setState({
                loading:false
            })
        })

    }

    //Loads settings from asyncstorage
    loadSettings = async () => {
        try {
          let settings = JSON.parse(await AsyncStorage.getItem('settings'));

          if (settings != null){
            this.setState({
                settings:{...this.state.settings, ...settings}
              });
          }
        }catch (error){
          Alert.alert('Error reading data');
        }
    }

    componentDidMount (){

        this.loadSettings();
        this.updateList();   

        //stuff is re-loaded when screen is navigated to
        this.props.navigation.addListener("didFocus", () => {
            this.loadSettings();
            this.updateList();   
        });

    }
    
   
    render () {
        if (this.state.loading){
            return (
                <View><Text>Loading!</Text></View>
            )
        }else if (!this.state.settings.pve && !this.state.settings.pvp && !this.state.settings.wvw && !this.state.settings.fractals ){
            return (
                <View>
                    <Text>No content selected - go enable something in the settings</Text>
                </View>
            )
        
        }else {
            return (
                <View>
                    <ScrollView>
                        {this.state.settings.pve ?
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
                            :
                            <View></View>
                        }
                        {this.state.settings.pvp ?
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
                            :
                            <View></View>
                        }
                        {this.state.settings.wvw ?
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
                            :
                            <View></View>
                        }
                        {this.state.settings.fractals ?
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
                            :
                            <View></View>
                        }
                       
                    </ScrollView>
                </View>
            );
        }
        
    }
        
}
