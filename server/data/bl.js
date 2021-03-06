var dal = require('./dal');
var models = require('../models/models');

function getlastpapaer(tablename, callback) {


    //select last 4 papers from a all papers tables
    dal.executeQuery(
        `(SELECT id, date, hebrew_date, number_of_pages FROM lainyan order by id desc limit 4)
        union
        (SELECT  id, date, hebrew_date, number_of_pages FROM meida order by id desc limit 4)
        union
        (SELECT  id, date, hebrew_date, number_of_pages FROM shavua order by id desc limit 4)
        UNION
        (SELECT  id, date, hebrew_date, number_of_pages FROM emtza order by id desc limit 4)
        UNION
        (SELECT  id, date, hebrew_date, number_of_pages FROM lainyan_bb order by id desc limit 4)`,
        function (err, row) {
            if (err) {
                callback(err);
            }
            callback(null, row);
            console.log(row);

        });
}

function getlastpapaerId(callback) {


    //select last id from a all papers tables
    dal.executeQuery(
        `(SELECT id FROM lainyan order by id desc limit 1)
        union
        (SELECT id FROM meida order by id desc limit 1)
        union
        (SELECT id FROM shavua order by id desc limit 1)
        UNION
        (SELECT id FROM emtza order by id desc limit 1)
        UNION
        (SELECT id FROM lainyan_bb order by id desc limit 1)`,
        function (err, row) {
            if (err) {
                callback(err);
            }
            callback(null, row);

        });
}

function saveContactData(table_name, rows, values, callback) {
    let sql = "INSERT INTO `" + table_name + "` (" + rows + ") VALUES (" + values + ")";
    dal.executeQuery(sql, function (err, result) {
        if (err) console.log(err);
        callback(null, "record inserted");
    });

}

function saveContactDataMultiple(table_name, rows, values, callback) {
    let sql = "INSERT INTO `" + table_name + "` (" + rows + ") VALUES " + values;
    dal.executeQuery(sql, function (err, result) {
        if (err) console.log(err);
        callback(null, "record inserted");
    });

}

// function saveInto2Tables(table1, table2, rows1, rows2, values1, values2, callback) {
//     let sql1 = "INSERT INTO `" + table1 + "` (" + rows1 + ") VALUES (" + values1 + ");"
//     console.log(sql1);
//     dal.executeQuery(sql, function (err, result) {
//         if (err) {
//             console.log(err);
//             callback(err);
//         } else {
//             let sql2 = "INSERT INTO `" + table2 + "` (" + rows2 + ") VALUES " + values2 + "; "

//             callback(null, result);
//         }
//     });

// }



// function saveluachData(table_name, rows, values, callback) {
//     let sql = "INSERT INTO `" + table_name + "` (" + rows + ") VALUES (" + values + ")";
//     dal.executeQuery(sql, function (err, result) {
//         if (err) console.log(err);
//         callback(null, result);
//     });

// }


module.exports.papers = {
    getlastpapaer: getlastpapaer,
    getlastpapaerId: getlastpapaerId
}

module.exports.dataFromCostumer = {
    saveContactData: saveContactData,
    saveContactDataMultiple: saveContactDataMultiple
}