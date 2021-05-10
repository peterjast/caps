'use strict';

module.exports = function logger(event, payload) {
  let timestamp = new Date();
  console.log({ timestamp, event, payload });
}