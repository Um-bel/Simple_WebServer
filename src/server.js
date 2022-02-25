const {app, users} = require("./assets");  

for(let i = 0; i < users.length; i++) {
    app.get("/user/" + users[i].username, function(req, res) {
        res.sendFile(__dirname + "/assets/user.html"); 
    });
}

//set a handler up for this later
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/assets/main.html"); 
});

app.get("/sign_up", function(req, res) {
    res.sendFile(__dirname + "/assets/sign_up.html"); 
}); 

app.get("/login", function(req, res) {
    res.sendFile(__dirname + "/assets/login.html"); 
}); 