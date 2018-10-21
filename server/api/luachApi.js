var luachCtrl = require('../controllers/luach.controller.js');
var express = require('express');
let multer = require('multer');
let app = express();
var router = express.Router();
let fileUpload = require("express-fileupload");
let data;
let path = require("path");



router.post('/',function(req,res){
        let contactContent = req.body;
    console.log(contactContent);
    contactCtrl.insertNewOrderToDB(req, function (err, done) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({
                done: false,
                why: err
            }));
        } else {
            res.end(JSON.stringify({
                done: true
            }));
        }
    });
  
});

router.post('/free',function(req,res){
    let luachfree = req.body;
console.log(luachfree);
luachCtrl.insertNewFreeLuach(req, function (err, done) {
    if (err) {
        console.log(err);
        res.end(JSON.stringify({
            done: false,
            why: err
        }));
    } else {
        res.end(JSON.stringify({
            done: true
        }));
    }
});

});





module.exports = router;