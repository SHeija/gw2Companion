import { StyleSheet, } from "react-native"
import { Constants } from 'expo';

export const styles = StyleSheet.create({
    //generic
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    card: {
        marginBottom: 10,
    },
    //makes the status bar behave
    statusBar: {
        backgroundColor: "#C2185B",
        height: Constants.statusBarHeight,
      },

    //errors
    errorTitle: {
        color: 'red'
    },
    minorerror: {
        color: 'red'
    },

    //settings
    input: {
        
        height: 90,
        width: '100%',
        borderColor: '#C2185B', 
        borderWidth: 1
    },
    settingslist: {
        marginBottom: 10
    },
    settingsbutton: {
        padding: 10,
        margin: 5,
    },
    settingstitle: {
        fontSize: 18,
        marginBottom: 10
    },
  

    //misc
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bg: {
        flex: 1,
        backgroundColor: 'pink'
    }


})