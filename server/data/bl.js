var dal = require('./dal');
var models = require('../models/models');

function getlastpapaer(tablename, callback) {


    //select last id from a all papers tables
    dal.executeQuery(
        `(SELECT id, date, hebrew_date FROM lainyan order by id desc limit 1)
        union
        (SELECT  id, date, hebrew_date FROM meida order by id desc limit 1)
        union
        (SELECT  id, date, hebrew_date FROM shavua order by id desc limit 1)
        UNION
        (SELECT  id, date, hebrew_date FROM emtza order by id desc limit 1)`,
        function (err, row) {
            if (err) {
                callback(err);
            }
            callback(null, row);
            console.log(row);

        });
}


function saveContactData(table_name, rows, values, callback) {
    let sql = "INSERT INTO `" + table_name + "` (" + rows + ") VALUES (" + values + ")";
    dal.executeQuery(sql, function (err, result) {
        if (err) console.log(err);
        callback(null, "1 record inserted");
    });

}



module.exports.papers = {
    getlastpapaer: getlastpapaer
}

module.exports.dataFromCostumer = {
    saveContactData: saveContactData
}