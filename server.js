// Dependencies
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const { fstat } = require('fs');
const fs = require('fs');
const { createContext } = require('vm');
const { notStrictEqual } = require('assert');

const app = express(); //instantiates the server
const PORT = process.env.PORT || 3001;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.use(express.static("public"));  // ?? Is this because index and notes are in the public folder?

// HTML Routes
// Send file, join path in public directory and respond with index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Create an array storage
let results = [];

function createNote(body) {
    var newNote = body;
    // console.log(newNote + 'is newNote');
    db.push(newNote); // add new note into db
    // check the db is updating
    console.log(db); 
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db)); // (path, data)
}

// function removeNote(note, id) {
//     //take away the note with the selected id
//     //return the 
// }

// API Routes
app.get('/api/notes', (req, res) => {
    results = JSON.stringify(db);
    // console.log(results);
    return res.json(db);
});

app.post('/api/notes', (req, res) => {
    createNote(req.body);
    // return the db after it has been updated
    return res.json(db);
});

// Bonus - Delete route
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params._id;
    const note = req.body;
    // removeNote(note, id)
     return res.json(db);
});


// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
