'use strict';
	var topic = require('./controllers/topic'),
	charts = require('./controllers/charts'),
	buzz = require('./controllers/buzz');

exports = module.exports = {
	topic: topic,
	charts: charts,
	buzz: buzz
};