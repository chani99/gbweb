var dal = require('./dal');
var models = require('../models/models');


function getlastpapaer(tablename, callback) {

    dal.executeQuery('SELECT id FROM `' + tablename + '` ORDER BY id DESC LIMIT 1', function(err, row) {
        // dal.executeQuery('SELECT * FROM `'+ tablename +'`', function(err, rows) {
        if (err) {
            callback(err);
        }
        callback(null, row[0]);

        // const customersObjectsArray = [];
        // rows.forEach(function (row) {
        //     customersObjectsArray.push(new models.Customer(row));
        // });
        // callback(null, customersObjectsArray);
    });
}

// module.exports.getCustomers = getCustomers;

module.exports.papers = {
    getlastpapaer: getlastpapaer
}