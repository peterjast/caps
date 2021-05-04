'use strict';

const events = require('./events.js');

require('./driver/driver');
require('./vendor/vendor');

events.on('pickup', payload => {
  const event = { event: 'pickup', time: new Date(), payload: payload}
  console.log('EVENT', event)
})

events.on('in-transit', payload => {
  const event = { event: 'in-transit', time: new Date(), payload: payload}
  console.log('EVENT', event)
})

events.on('delivered', payload => {
  const event = { event: 'delivered', time: new Date(), payload: payload}
  console.log('EVENT', event)
})