import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import { Header } from 'react-native-elements';



export default class DailyQuests extends React.Component {
    
    static navigationOptions = {
        title: 'Daily Quests',
      };

    render () {
        return (
            <View>
                
                <Text>
                Daily Quest
                </Text></View>
        );
    }
        
}