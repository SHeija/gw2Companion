import React from 'react';
import { View, Alert, ScrollView, AsyncStorage, ActivityIndicator } from 'react-native';
import { Text, ListItem, Card, } from 'react-native-elements';
import { getData, getInfo, keyValidator, permissionValidator } from '../Data/ApiHelper';
import { styles } from '../Styles/Style.js';


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
                apiKey: "", //nukes previous data if apiKey was changed
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
       
        //attempt only if key is valid
        if (keyIsValid){
            this.setState({
                invalidKey: false,
            });

            //check permission
            const hasPermission = await permissionValidator(apiKey, 'wallet')

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
                }
            }
        }
        return wallet;
    }
    
    getGSC = (value) => {
        
        //Looks stupid, works
        const gold = parseInt(value/100/100);
        const silver = parseInt((value/100/100-gold)*100);
        const copper = parseInt(((value/100/100-gold)*100-silver)*100);

        return gold+" gold, "+silver+" silver, "+copper+" copper";

    }

    deliveryCard = () => {
        return (            
                <Card
                    title="Waiting for Pickup"
                    style={styles.card}
                >
                <View>
                    <Text>Coins:</Text>
                    <Text>{this.getGSC(this.state.delivery.coins)}</Text>
                </View>
                <View>
                    <Text>Items:</Text>
                    {   
                        this.state.delivery.items.hasOwnProperty('text') ?
                        <Text>No items!</Text>
                        :
                        this.state.delivery.items.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                subtitle={item.description}
                                subtitleNumberOfLines = {5}
                                hideChevron
                            />
                        ))
                    }
                </View>
                </Card>
            
        );
    }

    walletCard = () => {
        return (
            <Card
                title="Wallet"
                style={styles.card}
            >
                {
                    this.state.wallet.map((item) => (
                    
                        <ListItem
                            key={item.id}
                            title={item.name}
                            subtitle={item.name == "Coin" ? this.getGSC(item.value) : item.value}
                            subtitleNumberOfLines = {5}
                            hideChevron
                        />
                    ))
                }
            </Card>
        );
    }

    errorCard = (msg) => {
        return (
        <View
            style={styles.bg}
        >
            <View style={styles.statusBar} />
            <Card
                title="Error"
                titleStyle={styles.errorTitle}
                style={styles.card}
            >
                <View>
                    <Text>{msg}</Text>
                </View>
            </Card>

        </View>
            
        );
    }

    render(){

       
        
        if (this.state.apiKey == null || this.state.apiKey == ""){
            return(
                this.errorCard("No API Key found")
            );
        }else if (this.state.loading){
            return(
                <View style={[styles.loading, styles.bg]}>        
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            );
        }else if(this.state.invalidKey){
            return(
                this.errorCard("Invalid API Key")
            );
        }else if(this.state.invalidPermission){
            return(
                this.errorCard("Missing API permission: wallet")
            );
        }
        else{
            return(
                <View style={styles.bg}>
                    <View style={styles.statusBar} />
                    <ScrollView>
                        {this.deliveryCard()}
                        {this.walletCard()}       
                    </ScrollView>
                </View>
            );
        }
        
    
    }
    
}