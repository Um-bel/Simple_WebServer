const express = require('express'); 
const app = express(); 
const http = require('http'); 
const server = http.createServer(app);
const { Server, Socket } = require("socket.io"); 
const io = new Server(server); 
const axios = require("axios").default; 
let users = require('../database/data/users.json'); 

module.exports = {app, io, axios, server, users}