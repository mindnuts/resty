exports.index = function(req, res) {
  EWA.db.select().from('Products').all()
    .error(function (e) {
            res.status(500).send('Database error: No records found');
        })
    .then(function (records) {
      res.send({ 'All_records' : records });
    });
};

exports.new = function(req, res) {
    res.send('form for new user');
};

/*
@Abstract creates a new product
@Method = POST
@Data data = {"stock_quantity": 5, "description": "Dell USB keyboard with 105 keys, chiclet style keyboard", "product_code": "dellKB1884", "name": "Dell 420 Key board", "sku": "dell387HUF6JKH"}
*/
exports.create = function(req, res) {
    var data = JSON.parse(req.body.data);
    var now = new Date();
    var createTimeStamp = EWA.dateFormat(now, "yyyy-dd-mm HH:mm:ss");    
    var foo = {
            stock_quantity: data.stock_quantity,
            description: data.description,
            product_code: data.product_code,
            name: data.name,
            sku: data.sku,
            stock_details: { 
                    "@type": "d",
                    "@class" : "Stock",
                    "stock_updated_date_time" : createTimeStamp,
                    "stock_created_date_time" : createTimeStamp,
                    "quantity" : data.stock_quantity,
                    "@version" : 0 
                }
            };

    EWA.db.query('insert into Products (stock_quantity, description, product_code, name,sku, stock_details) values (:stock_quantity, :description, :product_code, :name, :sku, :stock_details)',
        {
            params: foo
        }
    )
    .error(function (e) {
            res.status(500).send('Database error: Could not insert product');
        })
    .then(function (response){
        console.log(response); //an Array of records inserted
        res.send('Proudct inserted');
    });
};

exports.show = function(req, res) {
  EWA.db.record.get('#12:' + req.params.product)
    .error(function (e) {
        res.status(500).send('Database error: No such record');
    })
    .then(function (record) {
        res.send({ 'record' : record });
    });
};

exports.edit = function(req, res) {
    //console.log(req.params);
  res.send('form to edit user ' + req.params.product);
};


/*
@Abstract Method to edit a product
@Method PUT
@Data data = {name: 'New name'}
*/
exports.update = function(req, res) {
    var data = JSON.parse(req.body.data);
    EWA.db.update('Products').set({name: data.name}).where({'@rid' : '#12:' + req.params.product}).scalar()
    .error(function (e) {
            res.status(500).send('Database error: Could not update product');
        })
    .then(function (total) {
      res.send('updated total ' + total + " record(s)");
    });
};

/*
@Abstract Method to delete a Product
@Method DELETE
@Data void
*/
exports.destroy = function(req, res) {  
  EWA.db.delete().from('Products').where({'@rid' : '#12:' + req.params.product}).limit(1).scalar()
    .error(function (e) {
        res.status(500).send('Database error: Could not delete product');
        })
    .then(function (total) {
        res.send('deleted total ' + total + ' record(s)');
    });

};
