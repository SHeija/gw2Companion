 
export function getData (url) {

    let result = fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
            return responseJson
        })

        .catch((error) => { 
            Alert.alert(error);
        });
    
    
    return result;

}
       

