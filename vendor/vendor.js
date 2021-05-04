'use strict';

require('dotenv').config();
const events = require('../events.js');
var faker = require('faker');

const storeName = process.env.storeName;

events.on('delivered', thanks);

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

  events.emit('pickup', order);
}, 5000);

module.exports = { thanks }