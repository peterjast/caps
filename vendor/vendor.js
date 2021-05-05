'use strict';

require('dotenv').config();

const faker = require('faker');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const io = require('socket.io-client');

const socket = io.connect(`${SERVER_URL}/caps`);

const storeName = process.env.storeName;

socket.emit('join', storeName);

socket.on('delivered', payload => thanks(payload));

function thanks(payload) {
    console.log(`Thank you for delivering ${payload.orderId}`);    
}

setInterval(() => {
  let order = {
    store: storeName,
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', order);
}, 5000);
