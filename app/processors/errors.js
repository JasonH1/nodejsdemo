
exports = module.exports.render = function(req, res, object, template) {
	errors = require('../errors')(req, res);
	if (true) {
		// some error
		errors.emit('errors', "Some problem occured in example 2 processor", "processor:errors");
	} else {
		res.send(JSON.stringify(object));
	}
}