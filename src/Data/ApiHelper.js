//Basic JSON fetch
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

//Fetches info based on a comma delimited string of id's
export function getInfo (object, endpoint) {
    //object = the array from which the id's are gathered

    //extracting id's
    let idstring = '';
    for (let i = 0; i<Object.keys(object).length; i++){
        idstring = idstring + object[i].id +',';
    }

    //fetching today's quests based on id's
    const url = endpoint+idstring
    return getData(url);

}

//Checks if given API Key is valid by checking if it has given property
export async function keyValidator (apiKey, property) {

    const apiKeyCheckUrl = 'https://api.guildwars2.com/v2/tokeninfo?access_token='+apiKey;
    let keyIsValid;
    const apiKeyData = await getData(apiKeyCheckUrl);
    if (apiKeyData.hasOwnProperty(property)){
        keyIsValid=true;
    }else{
        keyIsValid=false;
    }
    
    return keyIsValid;

}

//Checks if given API Key is valid by checking if permissions-array has given permission
export async function permissionValidator (apiKey, permission) {

    const apiKeyCheckUrl = 'https://api.guildwars2.com/v2/tokeninfo?access_token='+apiKey;
    const apiKeyData = await getData(apiKeyCheckUrl);
    if (apiKeyData.permissions.includes(permission)){
        return true;
    }else{
        return false;
    }

}