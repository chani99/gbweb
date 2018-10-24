var bl = require('../data/bl');

let luachTableRows = "`user_phone`, `id`, `user_fname`, `user_lname`, `user_email`, `section`, `content`, `date`, `remarks`";
let showsTableRows = "`paper_name`, `paper_number`, `advert_id`"
let luachTableName = "luach";
let shoesTableName = "shows";
var nodemailer = require('nodemailer');
var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
let lastPapers = [];
const uuidv1 = require('uuid/v1');
let idForLuach = ""


function insertNewFreeLuach(req, callback) {
    let luachData = {};
    let luachShows = [];
    idForLuach = uuidv1();


    bl.papers.getlastpapaerId(function (err, res) {
        if (err) {
            callback('error getting last papers');
        } else {
            lastPapers = {
                lainyan: res[0].id,
                meida: res[1].id,
                shavua: res[2].id,
                emtza: res[3].id,
                lainyanBB: res[4].id
            };

            organizeluachForDB(req.body, true, function (order) {
                luachData = order;
            });

            organizeShowsForDB(req.body.shows, function (shows) {
                luachShows = shows;
            });

            saveLuachInDB(luachData, luachShows, function (err, done) {
                if (err) {
                    callback('free luach error: ' + err);
                } else {
                    callback(done);
                }

            });

        }
    });

}

//saves luach in db
function saveLuachInDB(luach, shows, callback) {

    let luachValues = `${luach.user_phone}, '${luach.id}', '${luach.user_fname}', '${luach.user_lname}', '${luach.user_email}', '${luach.section}', '${luach.content}', '${luach.date}', '${luach.remarks}'`;
    let showsValues = "";

    for (i = 0; i < shows.length; i++) {//prepar shows for saving + advert id
        let show = shows[i];
        showsValues += `('${show.paper_name}', ${show.paper_number}, '${show.advert_id}'), `
    }
    showsValues = showsValues.slice(0, -2);

//save in db step 1 in luach table
    bl.dataFromCostumer.saveContactData(luachTableName, luachTableRows, luachValues, function (err, done) {
        if (err) {
            callback(err);

        } else {
            //save in db step 2 in shows table
            bl.dataFromCostumer.saveContactDataMultiple(shoesTableName, showsTableRows, showsValues, function (err, done2) {
                callback(null, done);
            });
        }

    });
}



//prepers shows for shows table
let organizeShowsForDB = function (shows, callback) {
    let adShows = [];
    let countShows = 0; //to add a number to each show in loop

    for (i = 0; i < shows.length; i++) {
        let showsPerPaper = shows[i].shows;
        let paperName = shows[i].type;
        let paperNumber = lastPapers[paperName];

        for (x = 0; x < showsPerPaper; x++) { //c
            adShows.push({
                paper_name: paperName,
                paper_number: (paperNumber + countShows),
                advert_id: idForLuach
            });
            countShows += 1;
        }
    }

    callback(adShows);

}

//orgenize all luach data befor saving in data base
let organizeluachForDB = function (data, free, callback) {
    var luach = {};
    let freeSec = free;
    luach.date = new Date;
    luach.id = idForLuach;
    if (data.fname) luach.user_fname = data.fname;
    if (data.lname) luach.user_lname = data.lname;
    if (data.email) luach.user_email = data.email;
    if (data.phone) luach.user_phone = data.phone;
    if (data.section) luach.section = data.section;
    if (data.content) luach.content = data.content;
    if (data.remarks) luach.remarks = data.remarks;

    if (free) {
        luach.remarks = "ריק";
    }

    callback(luach);

}


module.exports.insertNewFreeLuach = insertNewFreeLuach;