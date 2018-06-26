var bl = require('../data/bl');
let rows = "`fname`, `lname`, `phone`, `date`, `email`, `content`";
let tableName = "order";
var nodemailer = require('nodemailer');
var express = require('express');


function insertNewOrderToDB(req, callback) {
    if (req.files) { //check if the client sent a file, and if - save it and then update
        saveFile(req.files, function(err, imageNewName) {
            if (err) {
                callback(err);
            } else {
                let order = req.body;
                order.image = imageNewName;
                saveOrderInDB(updateProduct, function(err, product) {
                    if (err) callback(err);
                    else callback(null, product)
                });
            }
        });

    } else { //otherwise just update
        product(req.body, function(err, product) {
            if (err) callback(err);
            else callback(null, product)
        });
    }
}


//saves order in db
function saveInDB(order, callback) {
    organizeDataForDB(order, function(data) {
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
    let sampleFile = file.productImage;
    let filename = sampleFile.name;
    sampleFile.mv(`client/uploads/${filename}`, function(err) {
        if (err) {
            callback("status(500).send(err)");
        } else {
            callback(null, filename);

        }
    })

}

let organizeDataForDB = function(data, callback) {
    var order = {};
    if (data.name) order.name = data.name;
    if (data.category) order.category_id = data.category;
    if (data.price) order.price = data.price;
    if (data.image) order.image = data.image;
    callback(order);

}

module.exports.insertNewOrderToDB = insertNewOrderToDB;