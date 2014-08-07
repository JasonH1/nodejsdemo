'use strict';

var hbs = require('express-hbs');

hbs.registerHelper('log', function(object, options) {

  console.log(object);

  return new hbs.SafeString("");
});

exports = module.exports = function(app, express) {
    // Handlebars template for rendering html
    app.engine('hbs', hbs.express3({
        extname: ".html",
        partialsDir: __dirname + '/src/partials/api'
    }));
    app.set('view engine', 'hbs');
    app.set('views', __dirname + '/src/partials/api');

    // Configuration for server
	app.configure(function() {
	    app.use(express.cookieParser());
	    app.use(express.bodyParser());
	    app.use(express.json());
	    app.use(express.urlencoded());
	    app.use(express.methodOverride());
	    app.use(express.favicon());
	    app.use(express.session({
	        secret: 'abc12345',
	        cookie: {
	            httpOnly: false
	        }
	    }));
	    app.use(app.router);
	    console.log('STATIC_DIR '+ __dirname + app.STATIC_DIR);
	    app.use("/", express.static(__dirname + app.STATIC_DIR));

	});
};