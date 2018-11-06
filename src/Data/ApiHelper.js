import React from 'react';

class ApiHelper {
 
   async getData (url) {

        //template = the "shape" of the expected object
        let result = await fetch(url)
        .then((response) => response.json())
        .then((responseJson) => { 
          return responseJson
        })
    
        .catch((error) => { 
          result = error; 
        });
         
        
       return result;
    
      }
    
       
}

const helper = ApiHelper;
export default helper;