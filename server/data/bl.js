var dal = require('./dal');
var models = require('../models/models');


function getlastpapaer(tablename, callback) {


//select last id from a all papers tables
    dal.executeQuery(
        `SELECT MAX(Id) FROM lainyan 
            UNION
            SELECT MAX(Id) FROM meida
            UNION
            SELECT MAX(Id) FROM shavua
            UNION
            SELECT MAX(Id) FROM emtza`,
            function(err, row) {
                    if (err) {
                        callback(err);
                    }
                    callback(null, row);
                    console.log(row);

    });
}


module.exports.papers = {
    getlastpapaer: getlastpapaer
}