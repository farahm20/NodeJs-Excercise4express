const express = require ('express');
const fs = require('fs');
const http = require('http');
const app = express();

//public folder acts like a middleware for serving storing static files
//such as css files, images, javascript
app.use(express.static('public'));

app.get('/api/insult', (req, res) => {
    const searchTerm = req.query.search;
    console.log('Search term is: ' , searchTerm);
    
    let result = [];
    let allInsult;

    http.get('http://shakespeare-insults-generator.herokuapp.com/getAll', (response) => {            
        let data = '';
    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
    //    console.log(JSON.parse(data));
            let allInsult = JSON.parse(data);
            console.log('All insults: ', allInsult);

            for(insult of allInsult){
                if(insult.play == searchTerm) {
                    result.push(insult);
                }
            }

            console.log("Inside reult: " , result);
            res.end(JSON.stringify(result));
        });
    });
});

app.get('/api/getTheInsult', (req, res) => {
    const insult = {
        insult: 'Have you no wit, manners, nor honesty but to gabble like tinkers at this time of night?',
        play: 'Twelfth Night'
    }

    res.send(JSON.stringify(insult));
});
app.listen(8000);