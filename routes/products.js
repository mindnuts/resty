var getOneProduct = function(opts, callback) {
    return callback(null, {foo: opts.id});
}

module.exports = {
    getOneProduct: getOneProduct
}

var getAllProducts = function(opts, callback) {
    EWA.db.select().from('Products').all()
    .error(function (e) {
            return callback(500,'Database error: No records found');
        })
    .then(function (records) {
      return callback(null, { 'All_records' : records });
    });
}

module.exports = {
    getAllProducts: getAllProducts
}

var getExample = function(opts, callback) {
  EWA.db.record.get('#12:' + opts.id)
    .error(function (e) {
        return callback({error: 'Database error: No such record'}, null);
    })
    .then(function (record) {
        return callback(null, { 'record' : record });
    });
}

module.exports = {
  getExample: getExample
}
