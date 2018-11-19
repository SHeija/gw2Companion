import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert,} from 'react-native';
import { List, ListItem, } from 'react-native-elements'
import schedule from '../Data/scheduleVanilla.json';

export default class WorldBosses extends React.Component {

    constructor(props){
        super(props);
        this.state = {data:schedule}
        this.schedule = schedule;
    }

    static navigationOptions = {
        title: 'World Bosses',
      };
    
    componentDidMount () {
        this.updateList();
    }

    updateList = () => {
        
        const date = new Date();
        //let timezoneOffset = date.getTimezoneOffset/60; //in hours
        const temp = [];

        for (let i = 0; i<Object.keys(this.schedule).length; i++){

            const time = this.schedule[i].Time.split(".");
            const hours = parseInt(time[0]);
            const minutes = parseInt(time[1]);
            
            if (date.getUTCHours() == hours && date.getUTCMinutes() <= minutes){
                temp.push(this.schedule[i-1]);
                for (let j = 0; j<7; j++){
                    temp.push(this.schedule[i+j]);
                }
                break
            }else if (date.getUTCHours() == hours && date.getUTCMinutes() > 45 && minutes == 45) {

                for (let j = 0; j<7; j++){
                    temp.push(this.schedule[i+j]);
                }
                break

            }
            
        }
        
        this.setState({
            data: temp,
        });
        
    }

    render () {
        return (
            <View>
               
                    
                <ScrollView>
                    <List>
                        {
                            this.state.data.map((item) => (
                            <ListItem
                                key={item.Time+item.Boss}
                                title={item.Boss}
                                subtitle={item.Time+" "+item.Zone}
                            />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

}