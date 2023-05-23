const express = require("express");
// const expressWebSocket = require("express-ws");
// const websocket = require("websocket-stream");
// const websocketStream = require("websocket-stream/stream");
const PORT = process.env.PORT || 3300;
const hbs = require("hbs");
const socketIO = require('socket.io');
const io = socketIO(server);


const app = express();

// expressWebSocket(app, null, {
//     perMessageDeflate: false
// });

//app.engine("hbs", hbs());
app.set("view engine", "hbs");

// make all the files in 'public' available
app.use(express.static("public"));
app.get("/", (request, response) => {
    response.render("home", {layout: false});
});

/*app.ws("/media", (ws, req) => {
    ws.send('Hello from the server!');
    ws.on('message', message => {
        console.log('Received message:', message);
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});*/

const listener = app.listen(PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
});

// Handle socket connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle 'message' event
    socket.on('message', (data) => {
        console.log('Received message:', data);
        // Broadcast the message to all connected clients
        io.emit('message', data);
    });

    // Handle 'disconnect' event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});