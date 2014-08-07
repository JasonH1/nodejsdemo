var beautify = require('js-beautify').js_beautify;

exports = module.exports.render = function(req, res, object) {
  res.send(JSON.stringify(object));
}