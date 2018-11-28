 
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

export function getInfo (object, endpoint) {
    //object = the object array from which the id's are gathered
    //extracting id's
    let idstring = '';
    for (let i = 0; i<Object.keys(object).length; i++){
        idstring = idstring + object[i].id +',';
    }

    //fetching today's quests based on id's
    const url = endpoint+idstring
    return getData(url);

}
