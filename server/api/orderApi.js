var contactCtrl = require('../controllers/order.controller.js');
var express = require('express');
var router = express.Router();
let data;
let multer  = require('multer');
var upload = multer({ dest: 'client/uploads/' });


//get contact data
router.post('/', function (req, res) {
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



module.exports = router;