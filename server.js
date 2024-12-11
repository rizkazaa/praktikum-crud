const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "kampus"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected to Database");
});

//get all mahasiswa
app.get("/api/mahasiswa", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

//add new mahasiswa
app.post("/api/mahasiswa", (req, res) => {
    const { nama } = req.body;
    const sql = "INSERT INTO mahasiswa (nama) VALUES(?)";
    db.query(sql, [nama], (err, result) => {
        if (err) throw err;
        res.json({ message: "Mahasiswa added", id: result.insertId });
    });
});

//update mahasiswa
app.put("/api/mahasiswa", (req, res) => {
    const { nim } = req.params;
    const { nama } = req.body;
    const sql = "UPDATE mahasiswa SET nama = ? WHERE nim = ?";
    db.query(sql, [nama, nim], (err, result) => {
        if (err) throw err;
        res.json({ message: "Mahasiswa Update" });
    });
});
//delete mahasiswa
app.delete("/api/mahasiswa", (req, res) => {
    const { nim } = req.params;
    const sql = "DELETE FROM mahasiswa WHERE nim = ?";
    db.query(sql, [nim], (err, result) => {
        if (err) throw err;
        res.json({ message: "Mahasiswa Deleted" });
    });
});

app.listen(8000, () => {
    console.log("server is running on port 8000");
});