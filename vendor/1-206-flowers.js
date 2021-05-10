'use strict';

require('dotenv').config();

const faker = require('faker');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const io = require('socket.io-client');
const socket = io.connect(`${SERVER_URL}/caps`);
const storeName = '1-206-flowers'

socket.emit('join', storeName);

let vendor = { clientID: storeName, event: 'delivered'};

socket.emit('get-all', vendor);

socket.on('message', message => {
  if(message.payload.event === 'delivered' && message.payload.payload.store === storeName) {
    thanks(message);
  }
  if(message.payload.event === 'in-transit' && message.payload.payload.store === storeName) {
    socket.emit('received', message.id);
  }
});

socket.on('in-transit', message => {
  socket.emit('received', message.id);
});

setInterval(() => {
  let order = {
    store: storeName,
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', order);
}, 5000);

socket.on('delivered', thanks);

function thanks(message){
  console.log(`VENDOR: Thank you for delivering ${message.payload.payload.orderID}`);

  socket.emit('received', message.id);
}