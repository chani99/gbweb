var bl = require('../data/bl');

// CRUD
function getlastpaper(name, callback) {
    let tableName ="";
    switch(name){
        case "es": tableName = "emtza";
        break;
        case "st": tableName = "shavu";
        break;
        case "ml": tableName = "meida";
        break;
        case "la": tableName = "lainyan";
        break;
        
    }

    bl.papers.getlastpapaer(tableName, function(err, num) {
        if (err) {
            callback(err);
        }

        callback(null, num);
    })
}


module.exports.getlastpaper = getlastpaper;
