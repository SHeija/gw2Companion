import React from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import { ListItem, Card } from 'react-native-elements'
import schedule from '../Data/scheduleVanilla.json';
import { styles } from '../Styles/Style.js';

export default class WorldBosses extends React.Component {

    constructor(props){
        super(props);
        this.schedule = schedule;
        this.state = {data:schedule, refreshing:false, loading:true}
    }

    static navigationOptions = {
        title: 'World Bosses',
      };
    
    componentDidMount () {
        this.updateList();

        this.props.navigation.addListener("didFocus", () => {
            this.updateList();
        });

    }

    updateList = () => {
        
        const date = new Date();
        const temp = [];

        for (let i = 0; i<Object.keys(this.schedule).length; i++){

            const hours = parseInt(this.schedule[i].Hours);
            const minutes = parseInt(this.schedule[i].Minutes);
            
            if (date.getUTCHours() == hours && date.getUTCMinutes() < minutes){
                //pushing current and next 5 to temp
                temp.push(this.schedule[i-1]);
                for (let j = 0; j<7; j++){
                    temp.push(this.schedule[i+j]);
                }
                break
            }else if (date.getUTCHours() == hours && date.getUTCMinutes() > 45 && minutes == 45) {
                //same, but for the last quarter
                for (let j = 0; j<7; j++){
                    temp.push(this.schedule[i+j]);
                }
                break

            }
            
        }
        
        this.setState({
            data: temp,
            loading: false
        });
        
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        });
        this.updateList();
        this.setState({
            refreshing:false
        });
    }

    bossCard = (datasource,title) => {
        const date = new Date();
        const timezoneOffset = parseInt(date.getTimezoneOffset()/-60); //in hours

        return (
            <Card
                title={title}
                containerStyle={styles.card}
            >
                {
                    datasource.map((item) => (
                    <ListItem
                        key={item.Hours+item.Boss}
                        title={item.Boss}
                        subtitle={(parseInt(item.Hours)+timezoneOffset)+":"+item.Minutes}
                        hideChevron
                        
                    />
                    ))
                }
            </Card>
        );

    }

    render () {

        

        if (this.state.loading){
            return(
                <View style={[styles.loading, styles.bg]}>        
                    <ActivityIndicator size="large" color="#000000" />
                </View>
            );
        }else{
            return (
                <View style={styles.bg}>
                    <View style={styles.statusBar} />
                    <ScrollView
                        refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                        }
                    >

                    {this.bossCard(this.state.data, "World Bosses")}

                    </ScrollView>
                </View>
            );
        }
       
    }

}