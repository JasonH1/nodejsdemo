#!/bin/env node
/*
 *  Author: Jason Ho 2014
 *  NodeJS Example with Dart Charts
 */

var express = require('express'),
    fs = require('fs'),
    app = express(),
    STATIC_DIR = '/src',
    PRODUCTION = false,
    DEPLOYMENT = false,
    controllers = require('./app/controllers');

// print process.argv
process.argv.forEach(function(val, index, array) {
  if (val === 'build') {
    // run against production
    STATIC_DIR= '/build';
  }
});


app.STATIC_DIR = STATIC_DIR;
app.PRODUCTION = PRODUCTION;

//setup config
require('./config')(app, express);
//setup handlebars rendering.

//setup routes
require('./app/routes')(app, controllers);
require('./app/db')();
require('./app/processor')();


/*  ================================================================  */
/*  Helper functions.                                                 */
/*  ================================================================  */

/**
 *  Set up server IP address and port # using env variables/defaults.
 */
setupVariables = function() {
    //  Set the environment variables we need.
    app.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
    app.port = process.env.OPENSHIFT_NODEJS_PORT || 8888;

    if (typeof app.ipaddress === "undefined") {
        //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
        //  allows us to run/test the app locally.
        app.ipaddress = "127.0.0.1";
    };
};
/**
 *  terminator === the termination handler
 *  Terminate server on receipt of the specified signal.
 *  @param {string} sig  Signal to terminate on.
 */
terminator = function(sig) {
    if (typeof sig === "string") {
        console.log('%s: Received %s - terminating sample app ...',
            Date(Date.now()), sig);
        process.exit(1);
    }
    console.log('%s: Node server stopped.', Date(Date.now()));
};


/**
 *  Setup termination handlers (for exit and a list of signals).
 */
setupTerminationHandlers = function() {
    //  Process on exit and signals.
    process.on('exit', function() {
        terminator();
    });

    // Removed 'SIGPIPE' from the list - bugz 852598.
    ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
        'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
    ].forEach(function(element, index, array) {
        process.on(element, function() {
            terminator(element);
        });
    });
};


setupVariables();
setupTerminationHandlers();

var port = Number(process.env.PORT || 8888);


if (DEPLOYMENT) {
    // run Cluster 2
    var Cluster = require('cluster2');

    var c = new Cluster({
        port: port,
    });

    c.on('died', function(pid) {
        console.log('Worker ' + pid + ' died');
    });
    c.on('forked', function(pid) {
        console.log('Worker ' + pid + ' forked');
    });
    c.on('SIGKILL', function() {
        console.log('Got SIGKILL');
    });
    c.on('SIGTERM', function(event) {
        console.log('Got SIGTERM - shutting down');
    });
    c.on('SIGINT', function() {
        console.log('Got SIGINT');
    });

    c.listen(function(cb) {
        cb(app);
    });
} else {
    app.listen(port, function() {
        console.log('%s: Node server started on %s:%d ...',
            Date(Date.now()), app.ipaddress, app.port);
    });
}


