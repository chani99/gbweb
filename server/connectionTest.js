var mysql = require('mysql');
let query =
`(SELECT id, date, hebrew_date, number_of_pages FROM lainyan order by id desc limit 4)
union
(SELECT  id, date, hebrew_date, number_of_pages FROM meida order by id desc limit 4)
union
(SELECT  id, date, hebrew_date, number_of_pages FROM shavua order by id desc limit 4)
UNION
(SELECT  id, date, hebrew_date, number_of_pages FROM emtza order by id desc limit 4)
UNION
(SELECT  id, date, hebrew_date, number_of_pages FROM lainyan_bb order by id desc limit 4)`;



var con = mysql.createConnection({
  host: "node6533-galbeitar.j.box.co.il",
  user: "root",
  password: "POFybb21565",
  database: "gal_beitar"
});
 
con.connect(function(err) {
  if (err) throw err;
  console.log("You are connected!");
});

con.query(query, function(err, rows) {
  if (err) {
      console.log (err);
  } else {
    console.log(rows)
  }
});



con.end();
