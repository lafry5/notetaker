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
    db.push(newNote); // add new note into db
    // check the db is updating
    console.log(db); 
    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(db)); // (path, data)
    return db;
}

// function removeNote(find, db) {
//     //take away the note with the selected id
//    
// }

function findById(id, db) {         // This works!
    const find = db.filter(db => db.id === id)[0];
    return find;
}

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
    const find = findById(req.params.id, db);  // Find works!!!
    if (find) {
        res.json(find);
    } else {
        res.send(404);
    }
    console.log(req.params.id)
    console.log(find)
    console.log('This is the entry you chose to delete')  
    
    delete db[req.params.id];  
});


// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
