var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
const { finished } = require('stream');
const { request } = require('http');

//enable CORS for request verbs
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

//Mangesh Changes begins from here

app.use(bodyParser.json());
var data = fs.readFileSync('users.json');
// console.log(data);
var obj = JSON.parse(data);
// console.log(obj);

//get all users available
app.get('/allUsers', function (req, res) {
    fs.readFile("users.json", 'utf8', function (err, data) {
        console.log(data);
        res.send(data);
    });
})

//add new user to existing file
app.post('/addUser', function (req, res) {
    fs.readFile("users.json", 'utf8', function (err, data) {
        console.log(data);
        var data = JSON.parse(data);
        console.log(data);
        console.log(req.body);
        var dt = req.body;

        if (data.length == 0) {
            var idObj = data.length + 1;
        } else {
            var idObj = data[data.length - 1].id + 1;
        }
        dt.id = idObj;

        data.push(dt);
        console.log(data);

        var newObj = JSON.stringify(data, null, 2);
        console.log(newObj);
        console.log(typeof (data));

        fs.writeFile("users.json", newObj, finished);
        function finished(err) {
            console.log("Added User SuccessFully")
        }
        res.send(newObj);
    });
})

//update existing user
app.put('/updateUser/:id', function (req, res) {
    fs.readFile("users.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        console.log(data);

        console.log(req.body);
        var dt = req.body;

        var idParam = Number(req.params.id);
        console.log(idParam);

        for (let i = 0; i < data.length; i++) {
            console.log(data[i].id);
            if (idParam == data[i].id) {
                console.log("true");
                data[i].name = dt.name;
                data[i].email = dt.email;
                data[i].mbno = dt.mbno;
                data[i].pass = dt.pass;
                data[i].cpass = dt.cpass;
            } else {
                console.log("false")
            }
        }

        console.log(data);

        var newObj = JSON.stringify(data, null, 2);
        console.log(newObj);
        console.log(typeof (data));

        fs.writeFile("users.json", newObj, finished);
        function finished(err) {
            console.log("Updated User SuccessFully")
        }
        res.send(newObj);
    });
});

//delete user
app.delete('/deleteUser/:id', function (req, res) {
    fs.readFile("users.json", 'utf8', function (err, data) {
        var data = JSON.parse(data);
        console.log(data);

        var idParam = Number(req.params.id);
        console.log(idParam);
        newID = idParam + 1;

        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].id);
            if (idParam == data[i].id) {
                // console.log(data[i].id);
                // console.log("if true user found")
                data.splice(i, 1);
            } else {
                console.log("User with " + idParam + " not found")
            }
        }
        console.log(data);

        var newObj = JSON.stringify(data, null, 2);
        console.log(newObj);
        console.log(typeof (data));

        fs.writeFile("users.json", newObj, finished);
        function finished(err) {
            console.log("Deleted User SuccessFully")
        }
        res.send(newObj);
    });
});


//Mangesh Changes ends here
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

