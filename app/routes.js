'use strict';
	var errors = require('./errors'),
	processor = require('./processor')();

exports = module.exports = function(app, controllers) {

  // buzz demo
  app.get('/buzz', controllers.buzz.fetch);
  app.get('/buzz/:id', controllers.buzz.fetch);

  app.get('/api/buzz/:id', controllers.buzz.show);
  app.get('/api/buzz', controllers.buzz.fetchall);

  app.get('/api/charts', controllers.charts.demo);

};