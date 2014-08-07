'use strict';


exports = module.exports =  function(req, res) {
  var handler = new (require('events').EventEmitter)();
  handler.outcome = {
    success: false,
    errors: [],
    count: 0
  };
  handler.hasErrors = function() {
    return Object.keys(handler.outcome.errors).length !== 0 || handler.outcome.errors.length !== 0;
  };
  handler.on('error', function(err, stack) {
    handler.outcome.errors.push('Exception: '+ stack + ' : ' + err);
    handler.outcome.count ++;
  });

  handler.on('exception', function(err, stack) {
    handler.outcome.errors.push('Exception: '+ stack + ' : ' + err);
    handler.outcome.count ++;

    return handler.emit('response');
  });

  handler.on('response', function() {
    // You might want to change the response code here on the res (response object)
    // if there was an error
    handler.outcome.success = !handler.hasErrors();
    res.send(handler.outcome);
  });

  return handler;
};