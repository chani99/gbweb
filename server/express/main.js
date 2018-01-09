var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');

var customerCtrl = require('../controllers/emtza_controller');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../../client'));
app.use(express.static('../../papers'));
app.use(express.static('../node_modules'));
app.use('/public', express.static('../../client'));


app.get('/', function(req, res) {

    fs.readFile('../../client/index.html', 'utf8', function(err, data) {

        if (err) {
            console.log(err);
        }

        console.log('i am basic');
        res.end(data)
    });

});


// Start the server
var server = app.listen(8081, function() {
    console.log('listening to 8081')
})