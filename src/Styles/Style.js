import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        padding: 10,
    },
    errorTitle: {
        color: '#000'
    },
    input: {
        
        height: 90,
        width: '100%',
        borderColor: 'green', 
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
    minorerror: {
        color: 'red'
    },
    loading: {
        flex: 1,
        backgroundColor: 'pink',

        justifyContent: 'center',
        alignItems: 'center'
    },
    bg: {
        backgroundColor: 'pink'
    }


})