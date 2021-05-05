'use strict';

require('dotenv').config();
// const events = require('../events.js');
const faker = require('faker');
const port = process.env.PORT;
const io = require('socket.io-client');
const host = `http://localhost:${port}` || 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

const storeName = process.env.storeName;

socket.on('connection', socket => {
  socket.join(storeName);
});

socket.on('delivered', thanks);

const vendorId = faker.datatype.uuid();

function thanks(payload) {
  if(payload.vendorId === vendorId){
    console.log(`Thank you for delivering ${payload.orderId}`);    
  }
}


setInterval(() => {
  let order = {
    store: storeName,
    vendorId: vendorId,
    orderId: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  }
  socket.emit('pickup', order);
}, 5000);

module.exports = { thanks }