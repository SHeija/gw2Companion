
export default class ApiHelper {
 
    getData = (url) => {

        const result = [];
      
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
          result = responseJson;
        })
        .catch((error) => { 
          result = error; 
        }); 
        
        return result;

      }
       
}
