var express = require("express"),
    path = require("path"),
    app = express(),
    port = 8080,
    bodyParser = require("body-parser"),
    favicon = require("serve-favicon"),
    mainRoute = require("../api/mainApi"),
    fileUpload = require("express-fileupload"),
    cookieParser = require("cookie-parser"),
    session = require("express-session");


// ___________________________________________

app.use(express.static('../../client'));
app.use(express.static('../node_modules'));
app.use('/public', express.static('../../client'));
app.use(favicon(path.join(__dirname, "../../client/images/favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "../../client")));





 //////////////////// 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(fileUpload());
app.use(cookieParser());
app.use(session({
    secret: "TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX",
    resave: true,
    saveUninitialized: true
}));


app.listen(port, function () {
    console.log(`App listening on port ${port}`);
})

//main router index
app.use(mainRoute);

// _________________________________________________________________


