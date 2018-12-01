import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { getData, getInfo } from '../Data/ApiHelper';


export default class DailyQuests extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {settings : {}, data:{},  loading:true, }
    }

    static navigationOptions = {
        title: 'Daily Quests',
      };
  
    componentDidMount (){

        this.loadSettings()
        .then(() => {
            this.updateList();   
        });  

        //stuff is re-loaded when screen is navigated to
        this.props.navigation.addListener("didFocus", () => {
            this.loadSettings()
            .then(() => {
                this.updateList();   
            });
        });

    }

    updateList = async () => {

        //fetching today's quest ids
        const Dailyurl = 'https://api.guildwars2.com/v2/achievements/daily';
        const data_ids = await getData(Dailyurl);
        
        //fetching quest info, category at time
        let data = {};
        const endpoint = 'https://api.guildwars2.com/v2/achievements?ids=';
        data.pve = await getInfo(data_ids.pve, endpoint);
        data.pvp = await getInfo(data_ids.pvp, endpoint);
        data.wvw = await getInfo(data_ids.wvw, endpoint);
        data.fractals = await getInfo(data_ids.fractals, endpoint);
        data.special = await getInfo(data_ids.special, endpoint);

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
