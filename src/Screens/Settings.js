import React from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';


export default class Settings extends React.Component {
    constructor (props) {
        super(props);
        this.state = { settings: {"GuildWars2":false, "HeartOfThorns":false, "PathOfFire":false}, basic:true, HoT:true, PoF:true };
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
                PoF:settings["PathOfFire"]
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

    //formats settings into a string
    saveOnPress = () => {
        let settings = {"GuildWars2":false, "HeartOfThorns":false, "PathOfFire":false};

        if (this.state.basic){
            settings["GuildWars2"] = true;
        }
        if (this.state.HoT){
            settings["HeartOfThorns"] = true;
        }
        if (this.state.PoF){
            settings["PathOfFire"] = true;
        }

        this.setState({
            settings:settings
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
                <Button title='Save settings' onPress={this.saveOnPress}/>
                
              

            </View>
        );
    }

}