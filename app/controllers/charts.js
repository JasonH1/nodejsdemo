	var db = require('../db')(),
    Q = require('q'),
    processor = require('../processor')(),
  	request = require('request'),
  	massRelevanceUrl = 'http://api.massrelevance.com/FameCelebNews/fame500_celebrity_mention/meta.json?num_days=1';

var getRemoteContent = function (url, isJSON) {
  var deferred = Q.defer();
  request({
    url: url,
    json: isJSON
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      deferred.resolve(body);
    } else {
      deferred.reject(error);
    }
  });
  return deferred.promise;
};

exports = module.exports.demo = function(req, res) {
	getRemoteContent(massRelevanceUrl, true).fail(function (error) {
      processor.render(req, res, error, { template: 'charts' });
    }).done(function (response) {
      	var items = response.buckets.total;
      	processor.render(req, res, items, { template: 'charts' });
    });
};
