var bl = require('../data/bl');
let rows = "`fname`, `lname`, `phone`, `date`, `email`, `content`";
let tableName = "order";
var nodemailer = require('nodemailer');
var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');


//////////להכין לולאה שעוברת על הקבצים ושומרת כל אחד בנפרד בתיקיה נפרדת לכל לקוח...
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
                saveOrderInDB(order, function (err, wasdone) {
                    if (err) callback(err);
                    else callback(null, wasdone)
                });
            }
        });

    } else { //otherwise just update
        saveOrderInDB(req.body, function (err, wasdone) {
            if (err) callback(err);
            else callback(null, wasdone)
        });
    }
}


//saves order in db
function saveOrderInDB(order, callback) {
    organizeDataForDB(order, function (data) {
        bl.dataFromCostumer.saveContactData(tableName, rows, values, function (err, done) {
            if (err) {
                callback(err);
                console.log(err);

            } else {
                sendAmail(data, date, function (emailerr, emailsuc) {
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


//send email with order to galb
function sendAmail(data, date, callback) {
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
        subject: "הודעת 'צור קשר' חדשה התקבלה מהאתר",
        text: ` מאת: ${data.fname} ${data.lname}\r\n טלפון: ${data.phone}\r\n מייל: ${data.email}\r\n תוכן: ${data.content}`
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
    mkdirp(dir , function(err) { 

        // path exists unless there was an error
    
    });
    
    // sampleFile.mv(`client/uploads/${filename}`, function (err) {
    for (var i = 0; i < file.length; i++) {
        let sampleFile = file[i];
        let filename = sampleFile.name;

        sampleFile.mv(dir+ '/' + filename, function (err) {
            if (err) error ="status(500).send(err)";

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
    if (data.fname) order.fname = data.fname;
    if (data.lname) order.lname = data.lname;
    if (data.email) order.email = data.email;
    if (data.phone) order.phone = data.phone;
    if (data.location) order.location = data.location;
    if (data.addContent) order.content = data.addContent;
    if (data.remarks) order.remarks = data.remarks;
    if (data.size) order.size = data.size;
    if(data.shows) order.shows = data.shows;
    if(data.type) order.type = data.type;
    if(data.images) order.images = data.images;
    callback(order);

}

module.exports.insertNewOrderToDB = insertNewOrderToDB;