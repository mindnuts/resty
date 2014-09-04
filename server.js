bootstrap = require('./init/bootstrap.js');

//boot strap router, DB, config etc
EWA = bootstrap();

var restly = require('restly');
restly.init('./routes.json', {lib: "routes/"});

