'use strict';

require('dotenv').config();

const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${SERVER_URL}/caps`);

let driver = {clientID: 'driver', event: 'pickup'};

socket.emit('get-all', driver);

socket.on('message', message => {
  if(message.payload.event === 'pickup') {
    pickupAndDeliver(message);
  }
});

socket.on('pickup', pickupAndDeliver);

function pickupAndDeliver(message) {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${message.payload.payload.orderID}`);
    socket.emit('in-transit', message.payload.payload);
  }, 1500);

  setTimeout(() => {
    console.log(`Driver: delivered up ${message.payload.payload.orderID}`);
    socket.emit('delivered', message.payload.payload);
  }, 3000);
  
  socket.emit('received', message.id);
}
