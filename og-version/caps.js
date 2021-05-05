'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;
const io = require('socket.io')(port);

// require('./driver/driver');
// require('./vendor/vendor');

const caps = io.of('/caps');

// io.on('connection', (socket) => {
//   // console.log('client:', socket.id);
// });

caps.on('connection', (socket) => {

  console.log('client:', socket.id);


  socket.on('pickup', payload => {
    const event = { event: 'pickup', time: new Date(), payload: payload}
    console.log('EVENT', event);
    caps.emit('pickup', payload);
  })
  
  socket.on('in-transit', payload => {
    const event = { event: 'in-transit', time: new Date(), payload: payload}
    console.log('EVENT', event);
    caps.emit('in-transit', payload);
  })
  
  socket.on('delivered', payload => {
    const event = { event: 'delivered', time: new Date(), payload: payload}
    console.log('EVENT', event)
    caps.emit('delivered', payload);
  })

})