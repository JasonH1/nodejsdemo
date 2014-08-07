var beautify = require('js-beautify').js_beautify;

exports = module.exports.render = function(req, res, object, options) {
  var template;
  if (!object) object = {};
  if (!options.template) {
  	template = 'index';
  } else {
  	template = options.template;
  }
  console.log('html render '+ template);
  switch(options.template) {
  	case 'charts':
  		res.render(template, {
		    body: object

		  });
  		break;
  	case 'dart-linechart':
  		console.log('dart-linechart');
  		res.render(template, {
		    body: object

		  });
  		break;
  	case 'dart-linechart-list':
  		res.render(template, {
		    data: object
		  });
  		break;
  	default:
	  	res.render(template, {
	    topic: req.params.topic,
	    id: req.params.id,
	    body: beautify(JSON.stringify(object), {
	        indent_size: 2
	      })
	  });
  }

}