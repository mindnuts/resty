module.exports = function() {
    var EWA = {};//global object with our own namespace
    EWA.port = process.env.PORT || 8080;        // set our port
    EWA.application_root = "../" + __dirname;

    EWA.http = require('http');
    EWA.express = require('express');
    // Load express-resource BEFORE app is instantiated
    EWA.resource = require('express-resource');
    EWA.dateFormat = require('dateformat');

    EWA.app = EWA.express();

    //EWA.app.use(EWA.app.router);

    //express settings
    // configure app to use bodyParser()
    // this will let us get the data from a POST
    EWA.bodyParser = require('body-parser'); //body parser
    EWA.app.use(EWA.bodyParser.urlencoded({ extended: true }));
    EWA.app.use(EWA.bodyParser.json());
    
    // Module dependencies.
    EWA.config = require('config');//config middleware
    EWA.dbConfig = EWA.config.get('dbConfig');
    EWA.Oriento =  require('oriento');
    EWA.server = EWA.Oriento({
      host: EWA.dbConfig.main.dbHostName,
      port: EWA.dbConfig.main.dbPort,
      name: EWA.dbConfig.products.dbName,
      username: EWA.dbConfig.main.dbUserName,
      password: EWA.dbConfig.main.dbUserPassword
    });

    EWA.db = EWA.server.use({
      name: EWA.dbConfig.products.dbName,
    });
    
    return EWA;
};