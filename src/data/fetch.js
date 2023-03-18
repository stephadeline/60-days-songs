import fs from "fs";
import * as aq from "arquero";
const { op } = aq;



fetch('https://api.spotify.com/v1/artists/21E3waRsmPlU7jZsS13rcj', {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            }
        })
            .then((response) => {
                console.log(response.json().then(
                    (data) => { console.log(data) }
                ));
            });

// // api url
// const api_url = 
//       "https://employeedetails.free.beeceptor.com/my/api/path";
  
// // Defining async function
// async function getapi(url) {
    
//     // Storing response
//     const response = await fetch(url);
    
//     // Storing data in form of JSON
//     var data = await response.json();
//     console.log(data);
//     if (response) {
//         hideloader();
//     }
//     show(data);
// }
// // Calling that async function
// getapi(api_url);



// fs.writeFileSync(
//   "src/data/totalMeatDifference.json",
//   JSON.stringify(total_meat_2018, null, 2)
// );

// Trying to optimize
