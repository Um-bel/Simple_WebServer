const {server} = require("./src/assets"); 
require('dotenv').config(); 
require('./database/database'); 

server.listen(3000, function() {
    console.log("Server listening on port 3000"); 
}); 