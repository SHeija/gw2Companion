import React from 'react';
import { View, Text, Alert, AsyncStorage, ToastAndroid, ScrollView,} from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { TextInput} from 'react-native-paper';
import { styles } from '../Styles/Style';


export default class Settings extends React.Component {
    constructor (props) {
        super(props);
        this.state = { 
            settings: {},
            apiKey: "",
            pve:true, pvp:true, wvw:true, fractals:true //switches
        };
    }

    componentDidMount(){
        this.loadSettings()
        .then(()=>{
            if (this.state.settings = null){ //if settings = null, turn everything on
                const settings = {"pve":true, "pvp":true, "wvw":true, "fractals":true}
                this.setState({
                    settings:settings
                }, () => {
                    this.saveSettings();
                });
               
            }
        });

        this.props.navigation.addListener("didFocus", () => {
            this.loadSettings();
        });
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
                wvw:settings["wvw"],
                fractals:settings["fractals"],
              });
          }
        }catch (error){
          Alert.alert('Error reading settings');
        }

        try {
            let apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey != null){
                this.setState({
                    apiKey:apiKey
                })
            }
        }catch(error){
            Alert.alert('Error reading apikey')
        }
    }

    //saves settings to asyncstorage
    saveSettings = async () => {
       
        const settings = JSON.stringify(this.state.settings);
        const apiKey = this.state.apiKey;
       
        try {
            await AsyncStorage.setItem('settings', settings);
            await AsyncStorage.setItem('apikey', apiKey);
            ToastAndroid.show('Settings saved successfully', ToastAndroid.SHORT);
        }catch (error){
            Alert.alert('Error writing data');
        }
    }

    //formats settings into a Json
    saveOnPress = () => {
        let settings = {"pve":false, "pvp":false, "wvw":false, "fractals":false};

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
                <ScrollView>
                    <View
                        style = {styles.container}
                    >
                        <Text style={styles.settingstitle}>Authentication</Text>
                        <TextInput
                            label = "API Key"
                            onChangeText={(apiKey) => this.setState({apiKey})}
                            value={this.state.apiKey}
                            style= {styles.input}
                            multiline
                            numberOfLines={2}
                        />
                   </View>
                   <View
                    style={styles.container}
                   >
                        <Text style={styles.settingstitle}>Selected Content</Text>
                        { !this.state.pve && !this.state.pvp && !this.state.wvw && !this.state.fractals && 
                            <Text style={styles.minorerror}>Note: if nothing is selected, "Daily quests" will be empty</Text>
                        }
                        <List
                            containerStyle={styles.settingslist}
                        >
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
                        
                        <Button 
                            buttonStyle={styles.settingsbutton}
                            title='Save settings'
                            onPress={this.saveOnPress}
                        />
                    </View>
              
                </ScrollView>
            </View>
        );
    }

}