 'use strict';
    // Include our "db"
    var db = require('../../config/db')();
    // Exports all the functions to perform on the db
    module.exports = {getAll, save, getOne, update, delcustomer, clearcustomer};

    //GET /customer operationId
    function getAll(req, res, next) {
      res.json({ customers: db.find()});
    }
    //POST /customer operationId
    function save(req, res, next) {
        var result = db.save(req.body);
        res.json({success: result.success, id: result.id, description: "customer added to the list!"});
    }
    //GET /customer/{id} operationId
    function getOne(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var customer = db.find(id);
        if(customer) {
            res.json(customer);
        }else {
            res.status(204).send();
        }       
    }
    //PUT /customer/{id} operationId
    function update(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        var customer = req.body;
        if(db.update(id, customer)){
            res.json({success: 1, id: id, description: "customer updated!"});
        }else{
            res.status(204).send();
        }

    }
    //DELETE /customer/{id} operationId
    function delcustomer(req, res, next) {
        var id = req.swagger.params.id.value; //req.swagger contains the path parameters
        if(db.remove(id)){
            res.json({success: 1, description: "customer deleted!"});
        }else{
            res.status(204).send();
        }

    }
    //DELETE /customerClear
    function clearcustomer(req, res, next) {
            res.json({success: db.clear(), description: "All customers deleted!"});
    }