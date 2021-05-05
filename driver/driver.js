'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${SERVER_URL}/caps`);

socket.on('pickup', payload => pickupAndDeliver(payload));

function pickupAndDeliver(payload) {

  setTimeout(() => {
    console.log(`DRIVER: picking up ${payload.orderId}`);
    socket.emit('in-transit', payload);
  }, 1500)

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
  }, 3000)

};