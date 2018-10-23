const mysql = require('mysql');

function executeQuery(query, callback) {
    const con = mysql.createConnection(
        // connection details
        {
            host: "node6533-galbeitar.j.box.co.il",
            user: "root",
            password: "POFybb21565",
            database: "gal_beitar"
        }
    );
    // host: 'localhost',
    // password: '',

    // 3.cconnect
    con.connect(function (err) {
        if (err) {
            console.log('Error connecting to DB:' + err);
            return;
        }
        console.log('Connected');
    });

    // 4. crud : insert
    con.query(query, function (err, rows) {
        if (err) {
            callback(err);
        } else {
            callback(null, rows)
        }
    });
    con.end();
}

module.exports.executeQuery = executeQuery;