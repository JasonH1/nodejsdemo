	var db = require('../db')(),
	processor = require('../processor')();

exports = module.exports.get = function(req, res) {
	processor.render(req, res, db.get(req.params.id));
};

exports = module.exports.set = function(req, res) {
	processor.render(req, res, db.set(req.params.id, req.body));
};