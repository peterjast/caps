'use strict';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const logger = require('./logger');
const uuid = require('uuid').v4;

io.on('connection', socket => {
  console.log('connected user - server level:', socket.id);
});

const caps = io.of('/caps');

const undeliveredQueue = {
  messages: {}
};

caps.on('connection', socket => {
  socket.on('join', room => {
    console.log('room name:', room);
    socket.join(room);
  });

  socket.on('pickup', payload => {
    const id = uuid();
    undeliveredQueue.messages[id] = {event: 'pickup', payload};
    logger('pickup', payload);
    caps.emit('pickup', {id, payload: undeliveredQueue.messages[id]});
  });

  socket.on('in-transit', payload => { 
    const id = uuid();
    undeliveredQueue.messages[id] = {event: 'in-transit', payload};
    logger('in-transit', payload);
    caps.to(payload.store).emit('in-transit', {id, payload: undeliveredQueue.messages[id]}); 
  });

  socket.on('delivered', payload => {
    const id = uuid();
    undeliveredQueue.messages[id] = {event: 'delivered', payload};
    logger('delivered', payload);
    caps.to(payload.store).emit('delivered',{id, payload: undeliveredQueue.messages[id]});
  });

  socket.on('get-all', payload => {

    Object.keys(undeliveredQueue.messages).forEach(id=> {
      socket.emit('message', {id, payload: undeliveredQueue.messages[id]});
    });

  });

  socket.on('received', id => {
    delete undeliveredQueue.messages[id];
  });
  
});
