const express = require("express");
const expressWebSocket = require("express-ws");
const websocket = require("websocket-stream");
const websocketStream = require("websocket-stream/stream");
const PORT = process.env.PORT || 3300;
const hbs = require("express-handlebars");

const app = express();

expressWebSocket(app, null, {
    perMessageDeflate: false
});

app.engine("hbs", hbs());
app.set("view engine", "hbs");

// make all the files in 'public' available
app.use(express.static("public"));
app.get("/", (request, response) => {
    response.render("home", {layout: false});
});

app.ws("/media", (ws, req) => {
    ws.send('Hello from the server!');
    ws.on('message', message => {
        console.log('Received message:', message);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});