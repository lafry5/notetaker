// Dependencies
const express = require('express');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Routes
app.use(express.static("public"));

// HTML Routes
// Send file, join path in public directory and respond with index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// API Routes
app.get('/api/notes', (req, res) => {
    return res.json(db);
});

// Listener
// =============================================================
app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
  });
