const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8900;


let notesData = [];

app.use(express.json());
app.use(express.static("Develop/public"));
app.use(express.urlencoded({ extended: true}));

app.get("/api/notes", function(err, res) {
    try {
        notesData = fs.readFileSync("Develop/db/db.json", "utf8");
        notesData = JSON.parse(notesData);

    } catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }
    res.json(notesData);
});

app.post("/api/notes", function(req,res) {
    try {
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log(notesData);
        notesData = JSON.parse(notesData);
        req.body.id = notesData.length;
        notesData.push(req.body);
        notesData =JSON.stringify(notesData);
        fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err){
            if (err) throw err;
        });
    } catch (err) {
        throw err;
        console.error(err);
    }
});

app.delete("/api/notes/:id", function(req, res){
    try {
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        notesData = JSON.parse(notesData);
        notesData = notesData.filter(function(note){
            return note.id != req.params.id;
        });
        notesData = JSON.stringify(notesData);
        fs.writeFile("./Develop/db/db.json", notesData, "utf8", function(err){
            if (err) throw err;
        });
    } catch (err) {
        throw err;
        console.log(err);
    }
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/notes", function(req,res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(_dirname, "Develop/db/db.json"));
});


app.listen(PORT, function() {

    console.log('Listening on PORT: ' + PORT);
});