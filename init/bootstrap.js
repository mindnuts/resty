module.exports = function() {
    var EWA = {};//global object with our own namespace
    // Module dependencies.
    EWA.config = require('config');//config middleware
    EWA.application_root = __dirname;
    //EWA.bodyParser = require('body-parser'); //body parser

    EWA.dbConfig = EWA.config.get('dbConfig');

    EWA.Oriento =  require('oriento');

    //express settings

    // configure app to use bodyParser()
    // this will let us get the data from a POST
    //EWA.app.use(EWA.bodyParser.urlencoded({ extended: true }));
    //EWA.app.use(EWA.bodyParser.json());

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

    EWA.port = process.env.PORT || 8080;        // set our port
    return EWA;
    //Router
    //EWA.router = EWA.express.Router();
};