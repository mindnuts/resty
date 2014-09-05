bootstrap = require('./init/bootstrap.js');

//boot strap router, DB, config etc
EWA = bootstrap();

// Load the resourceful route handler
EWA.app.resource('products', require('./routes/products.js'));

EWA.app.listen(EWA.port, function() {
  console.log('App started. Listening on PORT:' + EWA.port);
});

