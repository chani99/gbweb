var bl = require('../data/bl');
let rows = " `date`, `fname`, `lname`, `email`, `phone`, `location`, `content`, `remarks`, `size`, `shows`, `images_folder`";
let tableName = "ad_order";
var nodemailer = require('nodemailer');
var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');


// ואז לשמור נתונים בSQL
// ואז לשלוח מייל עם הכל...
function insertNewOrderToDB(req, callback) {
    if (req.files) { //check if the client sent a file, and if - save it and then update
        saveFile(req.files['files[]'], function (err, imagesFolder) {
            if (err) {
                callback(err);
            } else {
                let order = req.body;
                order.images = imagesFolder;
                saveOrderInDB(order, req.files['files[]'], function (err, wasdone) {
                    if (err) callback(err);
                    else callback(null, wasdone)
                });
            }
        });

    } else { //otherwise just update
        saveOrderInDB(req.body, req.files, function (err, wasdone) {
            if (err) callback(err);
            else callback(null, wasdone)
        });
    }
}


//saves order in db
function saveOrderInDB(order, files, callback) {
    order.shows = stringShow(order.shows);
    

    organizeDataForDB(order, function (data) {
        // if(!data.images) data.images = "none";
        let values = `'${data.date}', '${data.fname}', '${data.lname}', '${data.email}', ${data.phone}, '${data.location}', '${data.content}', '${data.renarks}', '${data.size}', '${data.shows}', '${data.images}'`;
        bl.dataFromCostumer.saveContactData(tableName, rows, values, function (err, done) {
            if (err) {
                callback(err);
                console.log(err);

            } else {
                sendAmail(data, files, function (emailerr, emailsuc) {
                    if (emailerr) {
                        callback(emailerr);
                        console.log(emailerr);

                    } else {
                        callback(null, emailsuc);

                    }
                })

            }
        });

    });


}
//orgenize shosw from array object to string - to send by mail
function stringShow(allShows) {
    let stringShows = "";
    if (allShows) {
        let shows = JSON.parse(allShows);

        for (var i = 0; i < shows.length; i++) {
            stringShows += "עיתון: " + shows[i].type + " = " + shows[i].shows + " מופעים.\r\n"
        }
    }
    return (stringShows);
}


//send email with order to galb
function sendAmail(data, files, callback) {
    //create attacments
    let attached_images = [];

    var dir = './server/uploads/' + data.images;
    if (files) {
        for (var i = 0; i < files.length; i++) {
            attached_images.push({
                fileName: files[i].name,
                path: dir + '/' + files[i].name
            });
        }
    }
    //send mail to gb mail

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'galb.vip@gmail.com',
            pass: 'blagblag'
        }
    });

    var mailOptions = {
        from: data.email,
        to: 'galb.vip@gmail.com',
        subject: "הודעת 'הזמנת פרסום' חדשה התקבלה מהאתר",
        text: `\r\nמאת: ${data.fname} ${data.lname}\r\n
        טלפון: ${data.phone}\r\n
        מייל: ${data.email}\r\n
        ___________________________________\r\n
        תוכן: ${data.content}\r\n
        הערות: ${data.remarks}\r\n
        __________________________________\r\n
        גודל: ${data.size}\r\n
        מיקום: ${data.location}\r\n
        מופעים: ${data.shows}\r\n`,
        attachments: attached_images
    };





    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            callback(error)
            console.log(error);
        } else {
            callback(null, 'Email sent: ' + info.response);
            console.log('Email sent: ' + info.response);
        }
    });

}


function saveFile(file, callback) {
    let date = Date.now(); //name for a folder for images
    let error = false; //check if were errors

    var dir = './server/uploads/' + date;
    mkdirp(dir, function (err) {

        // path exists unless there was an error

    });

    // sampleFile.mv(`client/uploads/${filename}`, function (err) {
    for (var i = 0; i < file.length; i++) {
        let sampleFile = file[i];
        let filename = sampleFile.name;
        sampleFile.mv(dir + '/' + filename, function (err) {
            if (err) error = "status(500).send(err)";

        });
    }
    if (error) {
        callback("status(500).send(err)");

    } else {
        callback(null, date);
    }


}

let organizeDataForDB = function (data, callback) {
    var order = {};

    order.date = new Date;
    if (data.fname) order.fname = data.fname;
    if (data.lname) order.lname = data.lname;
    if (data.email) order.email = data.email;
    if (data.phone) order.phone = data.phone;
    if (data.location) order.location = data.location;
    if (data.addContent) order.content = data.addContent;
    if (data.remarks) order.remarks = data.remarks;
    if (data.size) order.size = data.size;
    if (data.shows) order.shows = data.shows;
    if (data.images) order.images = data.images;
    callback(order);

}

module.exports.insertNewOrderToDB = insertNewOrderToDB;