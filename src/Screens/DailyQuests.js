import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { ListItem, Card, } from 'react-native-elements';
import { getData, getInfo } from '../Data/ApiHelper';
import { styles } from '../Styles/Style.js';

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
          }else{
            const defaultSettings = {"pve":true, "pvp":true, "wvw":true, "fractals":true}
            this.setState({
                settings:{...this.state.settings, ...defaultSettings}
            });
          }
        }catch (error){
          Alert.alert('Error reading data');
        }
    }

    dataCard = (datasource, title) =>{
        return(
            <Card
                title={title}
                containerStyle={styles.card}
            >
                {
                    datasource.map((item) => (
                    <ListItem
                        key={item.id}
                        title={item.name}
                        subtitle={item.requirement}
                        subtitleNumberOfLines = {5}
                        hideChevron
                    />
                    ))
                }
            </Card>
        );
    }
   
    render () {
        if (this.state.loading){
            return (
                <View style={[styles.loading, styles.bg]}>        
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            )
        }else if (!this.state.settings.pve && !this.state.settings.pvp && !this.state.settings.wvw && !this.state.settings.fractals ){
            return (
                <View>
                    <Text>No content selected - go enable something in the settings</Text>
                </View>
            )
        
        }else {
            return (
                <View style={styles.bg}>
                    <View style={styles.statusBar} />


                    <ScrollView>
                        {this.state.settings.pve ?
                            this.dataCard(this.state.data.pve, "PvE")
                            :
                            <View></View>
                        }
                        {this.state.settings.pvp ?
                            this.dataCard(this.state.data.pvp, "PvP")
                            :
                            <View></View>
                        }
                        {this.state.settings.wvw ?
                            this.dataCard(this.state.data.wvw, "WvW")
                            :
                            <View></View>
                        }
                        {this.state.settings.fractals ?
                            this.dataCard(this.state.data.fractals, "Fractals")
                            :
                            <View></View>
                        }
                       
                    </ScrollView>
                </View>
            );
        }
        
    }
        
}
