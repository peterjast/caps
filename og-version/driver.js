'use strict';

require('dotenv').config();
const port = process.env.PORT;
const io = require('socket.io-client');
const host = `http://localhost:${port}` || 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

socket.on('pickup', pickUpAndDeliver);

function pickUpAndDeliver(payload) {

  setTimeout(() => {
    console.log(`DRIVER: picking up ${payload.orderId}`);
    socket.emit('in-transit', payload);
  }, 1500)

  setTimeout(() => {
    console.log(`DRIVER: delivered ${payload.orderId}`);
    socket.emit('delivered', payload);
  }, 3000)

}

module.exports = { pickUpAndDeliver }