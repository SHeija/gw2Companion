import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert,} from 'react-native';
import { List, ListItem, } from 'react-native-elements'
import schedule from '../Data/scheduleVanilla.json';

export default class WorldBosses extends React.Component {

    constructor(props){
        super(props);
        this.schedule = schedule;
        this.state = {data:schedule}
    }

    static navigationOptions = {
        title: 'World Bosses',
      };
    
    componentDidMount () {
        this.updateList();
    }

    updateList = () => {
        
        const date = new Date();
        const temp = [];

        for (let i = 0; i<Object.keys(this.schedule).length; i++){

            //const time = this.schedule[i].Time.split(".");
            const hours = parseInt(this.schedule[i].Hours);
            const minutes = parseInt(this.schedule[i].Minutes);
            
            if (date.getUTCHours() == hours && date.getUTCMinutes() <= minutes){
                
                temp.push(this.schedule[i-1]);
                for (let j = 0; j<5; j++){
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

        const date = new Date();
        const timezoneOffset = parseInt(date.getTimezoneOffset()/-60); //in hours

        return (
            <View>
               
                    
                <ScrollView>
                    <List>
                        {
                            this.state.data.map((item) => (
                            <ListItem
                                key={item.Hours+item.Boss}
                                title={item.Boss}
                                subtitle={(parseInt(item.Hours)+timezoneOffset)+":"+item.Minutes}
                            />
                            ))
                        }
                    </List>
                </ScrollView>
            </View>
        );
    }

}