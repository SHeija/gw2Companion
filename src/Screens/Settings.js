import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';


export default class Settings extends React.Component {
    constructor (props) {
        super(props);
        this.state = { settings : "", basic:true, HoT:true, PoF:true };
    }

    componentDidMount(){
        //this.saveSettings();
        this.loadSettings();
    }

    loadSettings = async () => {
        try {
          let settings = await AsyncStorage.getItem('settings');
          if (settings != null){
            this.setState({
                settings:settings
              });
          }
        }catch (error){
          Alert.alert('Error reading data');
        }
    }

    saveSettings = async () => {

        let settings = '';
       
        if (this.state.basic && !this.state.settings.includes("GuildWars2")){
            settings+="GuildWars2, ";
        }
        if (this.state.HoT && !this.state.settings.includes("HeartOfThorns")){
            settings+="HeartOfThorns, ";
        }
        if (this.state.PoF && !this.state.settings.includes("PathOfFire")){
            settings+="PathOfFire, ";
        }

        this.setState({
            settings:settings
        })

        try {
            await AsyncStorage.setItem('settings', settings);
        }catch (error){
            Alert.alert('Error writing data');
        }
    }

    render(){
        return (
            <View>
                <CheckBox
                    center
                    title='Basic GW2'
                    checked={this.state.basic}
                    onIconPress={(basic) => this.setState({basic:!basic})}
                />
                <CheckBox
                    center
                    title='Heart of Thorns'
                    checked={this.state.HoT}
                    onIconPress={(HoT) => this.setState({HoT:!HoT})}

                />
                 <CheckBox
                    center
                    title='Path of Fire'
                    checked={this.state.PoF}
                    onIconPress={(PoF) => this.setState({PoF:!PoF})}

                />
                <Button title='Save settings' onPress={this.saveSettings}/>
                <Text>{this.state.settings}</Text>
            </View>
        );
    }

}