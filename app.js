const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { MongoClient } = require("mongodb");
const e = require("express");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
mongoose.set('strictQuery', true);
app.set("view engine", "ejs");
//mongoose.connect("mongodb://localhost:27017/BusUserDB");
//const conn = mongoose.createConnection("mongodb://localhost:27017/BusUserDB");
// mongoose.connect(CONNECTION_URL);
//  ticketId: 'PKEGH3J2D',

const CONNECTION_URL="mongodb+srv://Lokesh16:Lokesh123@cluster0.b1unktw.mongodb.net/test";
const client = new MongoClient(CONNECTION_URL);
const db = client.db('test');
const Tickets = db.collection('tickets', { from: String, ticketId: String });


app.post("/login", function (req, res) {
    var name = req.body.email;
    var pass = req.body.pass;
    if (name == "admin" && pass == "12345") {
        res.redirect("/check");
    }
});

app.post("/", function (req, res) {

    var ticket = req.body.ticket;
    Tickets.findOne({ ticketId: ticket }, function (err, found) {

        if (found) {
            res.redirect("/success");
            console.log(found);
        }
        else {
            {
                res.redirect("/failure");
            }
        }
    })
});


app.get("/failure", function (req, res) {
    res.sendFile(__dirname + "/public/html/failed.html");
    
    
})
app.get("/success", function (req, res) {
    res.sendFile(__dirname + "/public/html/success.html");
   
   
})
app.get("/check", function (req, res) {
    res.sendFile(__dirname + "/public/html/check.html");
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/html/login.html");
})
app.listen(process.env.PORT, function (req, res) {
    console.log("Server is Ready");
})