// server.js
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Function to broadcast messages to all connected clients
const broadcast = (data) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

app.post('/place-order', (req, res) => {
    const orderDetails = req.body;
    console.log('Order received:', orderDetails);

    // Broadcast the order details to all connected clients
    broadcast(JSON.stringify(orderDetails));

    res.send('Order placed successfully!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
