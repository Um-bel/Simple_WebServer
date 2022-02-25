const {io, app, axios, users} = require('./assets'); 

io.on("connection", function(socket) {
    socket.on("SIGN_UP", async function(data) {
        //email check here
        for(let i = 0; i < users.length; i++) {
            if(users[i].email == data.email) {
                socket.emit("NEW_USER_EMAIL_FAILED", users[i]);
                return; 
            } else if(users[i].username == data.username) {
                socket.emit("NEW_USER_USERNAME_FAIL", users[i]); //make sure no more than 1 person can have the same username 
            }
        }

        users.push(data); 

        await axios.post(
            "http://localhost:3001/users.json", 
            data, {
                auth: process.env.SOMETOKENIDK
            });
        require('fs').writeFile(__dirname + "/database/data/users.json", 
        JSON.stringify(users), 
        function(err) {
            if(err) {
                throw err; 
            }
        }); 
        app.get("/user/" + data.username, function(req, res) {
            res.sendFile(__dirname, "/assets/user.html"); 
        });
        console.log("Initalizing new Server Route: user/" + data.username); 
        socket.emit("NEW_USER_MADE", data); 
    });

    socket.on("LOGIN", async function(data) {
        for(let i = 0; i < users.length; i++) {
            if(users[i].username == data.username) {
                if(users[i].password == data.password) {
                    socket.emit("LOGIN_SUCESS", users[i]); 
                    return; 
                } else {
                    socket.emit("LOGIN_PASSWORD_FAIL", users[i]); 
                    return; 
                }
            }
        }

        socket.emit("LOGIN_USERNAME_FAIL"); 
        return; 
    }); 
});