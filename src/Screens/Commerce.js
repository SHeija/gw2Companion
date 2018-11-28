import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, } from 'react-native-elements';

import { getData } from '../Data/ApiHelper';



export default class Commerce extends React.Component {
    constructor(props){
        super(props);
        this.state = { apiKey:"", delivery: {}, saleHistory:{}, loading:true };
    }

    componentDidMount(){
        this.loadSettings();
        this.updateData();

        this.props.navigation.addListener("didFocus", () => {
            this.loadSettings();
            this.updateData();
        });

    }

    loadSettings = async () => {
        try {
            let apiKey = await AsyncStorage.getItem('apikey');
            if (apiKey != null){
                this.setState({
                    apiKey:apiKey
                });
            }
        }catch(error){
            Alert.alert("Error loading settings");
        }

    }

    updateData = async () => {
        //0642AC9B-83BC-424B-ACAE-1CF086593ACF40519FC7-C3AB-47BE-85D5-3113C0F99ADF
        const apiKey = this.state.apiKey;
        const url =  'https://api.guildwars2.com/v2/commerce/delivery?access_token='+'0642AC9B-83BC-424B-ACAE-1CF086593ACF40519FC7-C3AB-47BE-85D5-3113C0F99ADF';
        const delivery = await getData(url);
        
        const items = await this.getInfo(delivery.items);
        delivery["items"]= items;
        this.setState({
            delivery: {...this.state.delivery, ...delivery},
        }, () => {
            this.setState({
                loading:false
            });
        });
        
    }

    getInfo = (object) => {
        //object = the "category" being fetched, e.g "pvp"
        //separating ids
        let idstring = '';
        for (let i = 0; i<Object.keys(object).length; i++){
            idstring = idstring + object[i].id +',';
        }

        //fetching today's quests based on id's
        const url = 'https://api.guildwars2.com/v2/items?ids='+idstring
        return getData(url);

    }

    render(){
        
        //Looks stupid, works
        const gold = parseInt(this.state.delivery.coins/100/100);
        const silver = parseInt((this.state.delivery.coins/100/100-gold)*100);
        const copper = parseInt(((this.state.delivery.coins/100/100-gold)*100-silver)*100);
        
        if (this.state.apiKey == null || this.state.apiKey == ""){
                return(
                    <View><Text>No API key found</Text></View>
                );
        }else if (this.state.loading){
            return(
                    <View><Text>Loading!</Text></View>
            );
        }else{
                return(
                    <View>
                        <ScrollView>
                            <Text>Waiting for Pickup</Text>
                            <View>
                                <Text>Coins:</Text>
                                <Text> {gold} gold, {silver} silver, {copper} copper</Text>
                            </View>
                            <View>
                                <Text>Items:</Text>
                                <List>
                                    {
                                        this.state.delivery.items.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={item.name}
                                            subtitle={item.description}
                                            leftAvatar={{ source: { uri: item.icon } }}
                                            subtitleNumberOfLines = {5}
                                            hideChevron
                                        />
                                        ))
                                    }
                                </List>
                            </View>
                            
                        </ScrollView>
                    </View>
            );
        }
        
    
    }
    
}