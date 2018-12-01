import React from 'react';
import { View, Text, Alert, ScrollView, AsyncStorage } from 'react-native';
import { List, ListItem, } from 'react-native-elements';
import { getData, getInfo, keyValidator, permissionValidator } from '../Data/ApiHelper';

export default class Commerce extends React.Component {
    constructor(props){
        super(props);
        this.state = { apiKey:"", delivery: {}, wallet:{}, loading:true, invalidKey:false, invalidPermission: false};
    }

    componentDidMount(){

        this.loadSettings()
        .then(() =>{
            this.updateData()
        });

        this.props.navigation.addListener("didFocus", () => {
            this.setState({
                loading:true,
                //nukes previous data if apiKey was changed
                apiKey: "",
                delivery: {},
                wallet: {},
            });
            this.loadSettings()
            .then(() =>{
                this.updateData()
            });
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

        //testKey:
        //0642AC9B-83BC-424B-ACAE-1CF086593ACF40519FC7-C3AB-47BE-85D5-3113C0F99ADF
        
        //check if the key is valid
        const apiKey = this.state.apiKey;
        const keyIsValid = await keyValidator(apiKey, 'id');
        const hasPermission = await permissionValidator(apiKey, 'wallet')
       
        //attempt only if key is valid
        if (keyIsValid){
            this.setState({
                invalidKey: false,
            });

            if (hasPermission){
                const delivery = await this.getDelivery(apiKey);
                const wallet = await this.getWallet(apiKey);
            
                this.setState({
                    delivery: {...this.state.delivery, ...delivery},
                    wallet: wallet,
                    invalidPermission: false,
                    loading: false
                });
            }else{
                this.setState({
                    invalidPermission: true,
                    loading: false
                });
            }
            
        }else{
            this.setState({
                invalidKey:true,
                loading: false
            })
        }
        
        
    }

    getDelivery = async (apiKey) => {
        const deliveryUrl =  'https://api.guildwars2.com/v2/commerce/delivery?access_token='+apiKey;
        const delivery = await getData(deliveryUrl);
        const itemUrl = 'https://api.guildwars2.com/v2/items?ids=';
        const deliveryItems = await getInfo(delivery.items, itemUrl);
        delivery["items"]= deliveryItems;
        return delivery;
    }

    getWallet = async (apiKey) => {
        const walletUrl = 'https://api.guildwars2.com/v2/account/wallet?access_token='+apiKey;
        const wallet = await getData(walletUrl);
        const currencyUrl = 'https://api.guildwars2.com/v2/currencies?ids=';
        const walletNames = await getInfo(wallet, currencyUrl);
        for (let i = 0; i<Object.keys(wallet).length;i++){
            for (let j = 0; j<Object.keys(walletNames).length;j++){
                if (wallet[i].id == walletNames[j].id){
                    wallet[i]["name"] = walletNames[j].name;
                    //wallet[i]["icon"] = walletNames[j].icon;
                }
            }
        }
        return wallet;
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
        }else if(this.state.invalidKey){
            return(
                <View><Text>Invalid API key</Text></View>
            );
        }else if(this.state.invalidPermission){
            return(
                <View><Text>API key doesn't have permission: wallet</Text></View>
            );
        }
        else{
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
                        <Text>Wallet</Text>
                        <List>
                        {
                                    this.state.wallet.map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={item.name}
                                            subtitle={item.value}
                                            leftAvatar={{ source: { uri: item.icon } }}
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
    
}