// http://api.freeplay.fame500.com/buzz.justin-bieber?page=1&per_page=14&format=json
var request = require("request"),
	qs = require('querystring'),
	 Q = require('q'),
	processor = require('../processor')(),
	_ = require('underscore'),
	Buzz;

request = request.defaults({
	jar: true
});

var SERVER = 'http://localhost:5000';

SERVER = 'http://api.dev.fame500.com';

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

exports = module.exports.fetch = function(req, res) {
	var id;
	if (!req.params.id) {
		id = "justin-bieber";
	} else {
		id = req.params.id;
	}
	errors = require('../errors')(req, res);

	errors.on('retry', function() {
		getRemoteContent(SERVER + '/buzz.' + id + '?page=1&per_page=14&format=json', true).fail(function (error) {
   			console.log('ERROR: Retrying...');

   			setTimeout(function(){ errors.emit('retry')}, 400);
	    }).done(function (response) {
	   		//console.log(body) // Print the google web page.
			if (response) {
				var json = response;
				var results = [];
				var count = 0;
				console.log(id +' response');
				console.log(response);

				results.push(["Time", "Mentions"]);
				_.each(json.items, function(item) {
					count++;
				});
				for (var x in json.items) {
					if (x < count - 1) {
						var i = parseInt(x) + 1;
						results.push([x, parseInt(json.items[x].buzz) - parseInt(json.items[i].buzz)]);
					}
				}
				processor.render(req, res, results, {
					processor: 'json'
				});
			}
	    });
	});

	errors.emit('retry');

};

exports = module.exports.fetchall = function(req, res) {
	if (!Buzz) {
		errors = require('../errors')(req, res);

		errors.on('retry', function() {
			getRemoteContent(SERVER + '/buzz.all?' + '&format=json', true).fail(function (error) {
	   			console.log('ERROR: Retrying...');

	   			setTimeout(function(){ errors.emit('retry')}, 400);
		    }).done(function (response) {
		    	if (response) {
		    		Buzz = response.items;

			   		//console.log(response);
					processor.render(req, res, Buzz, {
						template: 'dart-linechart-list'
					});
		    	}

		    });
		});

		errors.emit('retry');
	} else {
		processor.render(req, res, Buzz, {
			template: 'dart-linechart-list'
		});
	}

};


exports = module.exports.show = function(req, res) {
	console.log('buzz show')
	console.log(req.params);
	processor.render(req, res, {
		id: req.params.id
	}, {
		template: 'dart-linechart'
	});
};