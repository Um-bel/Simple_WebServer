const express = require('express'); 
const app = express(); 
const fs = require('fs');

app.use(express.json()); 

app.post("*", function(req, res) {
    req.body; 
    res.json(req.body); 
}); 

fs.readdir("./database/data", function(err, data) {
    if(err) {
        throw err; 
    }

    for(let i = 0; i < data.length; i++) {
        console.log("Initalizing new Database Route: ", data[i])
        app.get("/" + data[i], function(req, res) {
            fs.readFile(__dirname + "/data/" + data[i], function(err, data) {
                if(err) {
                    throw err; 
                } else {
                    res.json(JSON.parse(data)); 
                }
            }); 
        }); 
    }
}); 

app.listen(3001, function() {
    console.log("Database listening on port 3001"); 
}); 