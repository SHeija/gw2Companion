import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';


export default class Settings extends React.Component {
    constructor (props) {
        super(props);
        this.state = { settings: {}, basic:true, HoT:true, PoF:true, pve:true, pvp:true, wvw:true, fractals:true };
    }

    componentDidMount(){
        this.loadSettings();
    }

    //Loads settings from asyncstorage
    loadSettings = async () => {
        try {
          let settings = JSON.parse(await AsyncStorage.getItem('settings'));
          
          if (settings != null){
            this.setState({
                basic:settings["GuildWars2"],
                HoT:settings["HeartOfThorns"],
                PoF:settings["PathOfFire"],
                pve:settings["pve"],
                pvp:settings["pvp"],
                pvp:settings["wvw"],
                fractals:settings["fractals"]
              });
          }
        }catch (error){
          Alert.alert('Error reading data');
        }
    }

    //saves settings to asyncstorage
    saveSettings = async () => {
       
        const settings = JSON.stringify(this.state.settings);
       
        try {
            await AsyncStorage.setItem('settings', settings);
        }catch (error){
            Alert.alert('Error writing data');
        }
    }

    //formats settings into a Json
    saveOnPress = () => {
        let settings = {"GuildWars2":false, "HeartOfThorns":false, "PathOfFire":false, "pve":false, "pvp":false, "wvw":false, "fractals":false};

        if (this.state.basic){
            settings["GuildWars2"] = true;
        }
        if (this.state.HoT){
            settings["HeartOfThorns"] = true;
        }
        if (this.state.PoF){
            settings["PathOfFire"] = true;
        }
        if (this.state.pve){
            settings["pve"] = true;
        }
        if (this.state.pvp){
            settings["pvp"] = true;
        }
        if (this.state.wvw){
            settings["wvw"] = true;
        }
        if (this.state.fractals){
            settings["fractals"] = true;
        }

        this.setState({
            settings:{...this.state.settings, ...settings}
        }, () => {
            this.saveSettings();
        });   
        
    }

    render(){

        return (
            <View>
                <Text>Selected expansions:</Text>

                <List>
                    <ListItem
                        title="Guild Wars 2"
                        hideChevron
                        switchButton
                        switched = {this.state.basic}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,basic: value}
                            })
                          }}
                    />
                     <ListItem
                        title="Heart of Throrns"
                        hideChevron
                        switchButton
                        switched = {this.state.HoT}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,HoT: value}
                            })
                          }}
                    />
                     <ListItem
                        title="Path of Fire"
                        hideChevron
                        switchButton
                        switched = {this.state.PoF}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,PoF: value}
                            })
                          }}
                    />
                    
                </List>
                <Text>Selected Content:</Text>

                <List>
                    <ListItem
                        title="PvE"
                        hideChevron
                        switchButton
                        switched = {this.state.pve}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,pve: value}
                            })
                          }}
                    />
                     <ListItem
                        title="PvP"
                        hideChevron
                        switchButton
                        switched = {this.state.pvp}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,pvp: value}
                            })
                          }}
                    />
                     <ListItem
                        title="WvW"
                        hideChevron
                        switchButton
                        switched = {this.state.wvw}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,wvw: value}
                            })
                          }}
                    />
                    <ListItem
                        title="Fractals"
                        hideChevron
                        switchButton
                        switched = {this.state.fractals}
                        onSwitch = {(value) => {
                            this.setState(previousState => {
                              return {...previousState,fractals: value}
                            })
                          }}
                    />
                    
                </List>
                <Button title='Save settings' onPress={this.saveOnPress}/>
                
              

            </View>
        );
    }

}