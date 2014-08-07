'use strict';
var processors = require('./processors'),
  current;

exports = module.exports = function(source) {
  if (!source) {
    if (!current) {
      // initialize the db state once
      console.log('PROCESSOR INIT DEFAULT HTML');
      current = processors.html;
    }
  }
  return {
    render: function(req, res, object, options) {
      if (options && options.processor) {
        switch(options.processor) {
          case 'errors':
          processors.errors.render(req,res,object, options);
          break;
         case 'json':
          processors.json.render(req,res,object, options);
          break;
        }
      } else {
        if (req.query.format) {
          // is a processor format option
          switch(req.query.format) {
            case 'json':
            processors.json.render(req,res,object, options);
            break;
          }
        } else {
          current.render(req, res, object, options);
        }
      }


    }
  }
}