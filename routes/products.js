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
console.log(req.params.product);
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
@Data data = {name: 'New name', stock_quantity: stock_quantity}
*/
exports.update = function(req, res) {
    //console.log(req.params.product);

    var productId = '#12:' + req.params.product;

    var data = JSON.parse(req.body.data);

    var now = new Date();
    var updateTimeStamp = EWA.dateFormat(now, "yyyy-dd-mm HH:mm:ss");   

    EWA.db.record.get('#12:' + req.params.product)
    .then(function (record) {
        
        //console.log(JSON.stringify(record));

        if(data.name)
            record.name = data.name;
        if(data.stock_quantity)
        {
            record.stock_quantity = data.stock_quantity;
            record.stock_details.quantity = data.stock_quantity;
            record.stock_details.stock_updated_date_time = updateTimeStamp;

        }
        if(data.product_code)
            record.product_code = data.product_code;
        if(data.description)
            record.description = data.description;
        if(data.sku)
            record.sku = data.sku;

        var foo = {
                stock_quantity: record.stock_quantity,
                description: record.description,
                product_code: record.product_code,
                name: record.name,
                sku: record.sku,
                stock_details: { 
                        "@type": "d",
                        "@class" : "Stock",
                        "stock_updated_date_time" : record.stock_details.stock_updated_date_time,
                        "stock_created_date_time" : record.stock_details.stock_created_date_time,
                        "quantity" : record.stock_details.quantity,
                        "@version" : 0 
                    },          
                rid: productId    
            };

            //console.log(JSON.stringify(foo));
            //console.log(updateTimeStamp);


        EWA.db.query('update Products set stock_quantity= :stock_quantity, description= :description, product_code= :product_code, name= :name, sku= :sku, stock_details= :stock_details where @RID= :rid',
        {
            params: foo
        }
        ).error(function (e) {
            res.status(500).send('Database error: Could not update product');
        })
        .then(function (total) {
            res.send('updated total ' + total + " record(s)");
        });

        
           
       
    }).error(function (e) {
            res.status(500).send('Database error: Could not update product');
        })
    /*.then(function (total) {
      res.send('updated total ' + total + " record(s)");
    })*/
    ;
   
    
    

   /*
    var data = JSON.parse(req.body.data);
    EWA.db.update('Products').set({name: data.name, stock_quantity: data.stock_quantity}).where({'@rid' : '#12:' + req.params.product}).scalar()
    .error(function (e) {
            res.status(500).send('Database error: Could not update product');
        })
    .then(function (total) {
      res.send('updated total ' + total + " record(s)");
    });
    */
   
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
