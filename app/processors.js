'use strict';
	var json = require('./processors/json'),
	html = require('./processors/html'),
	errors = require('./processors/errors');
exports = module.exports = {
	json: json,
	html: html,
	errors: errors
};