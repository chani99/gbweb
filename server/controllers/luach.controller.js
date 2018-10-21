
var bl = require('../data/bl');
let rows = "`date`, `user_fname`, `user_lname`, `user_email`, `user_phone`, `section`, `content`, `remarks`";
let showsRows = "`advert_id`, `number`, `shows`"
let tableName = "luach";
var nodemailer = require('nodemailer');
var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
let lastPapers = [];




function insertNewFreeLuach(req, callback) {
    organizeluachForDB(req.body, true, function (order) {
        saveOrderInDB(order, function(err, order){
            if(err){
                callback(err);
                console.log(err);
            
            } else {
                 bl.papers.getlastpapaerId(function(err, res){
                    if (err){
                        callback (err)
                    } else {
                        lastPapers = res;
                    }
                });
                insertShowsToDb(order);


            }
    
        })
    

    });
}


//saves order in db
function saveOrderInDB(order, callback) {
    let data = order;
    let values = `'${data.date}', '${data.user_fname}', '${data.user_lname}', '${data.user_email}', ${data.user_phone}, '${data.section}', '${data.content}', '${data.remarks}'`;
    bl.dataFromCostumer.saveluachData(tableName, rows, values, function (err, done) {
        if (err) {
            callback(err);
            console.log(err);

        } else {
            callback(null, done.insertId);
        }

    });
}



//todo
let insertShowsToDb = function(shows, ad_id, callback){
    let adShows = {};
  
 
}

//orgenize all luach data befor saving in data base
let organizeluachForDB = function (data, free, callback) {
    var luach = {};
    let freeSec = free;
    var shows = shows
    if(free){
luach.remarks = ""
    }

    luach.date = new Date;
    if (data.fname) luach.user_fname = data.fname;
    if (data.lname) luach.user_lname = data.lname;
    if (data.email) luach.user_email = data.email;
    if (data.phone) luach.user_phone = data.phone;
    if (data.section) luach.section = data.section;
    if (data.content) luach.content = data.content;
    if (data.remarks) luach.remarks = data.remarks;
    callback(luach);

}

module.exports.insertNewFreeLuach = insertNewFreeLuach;