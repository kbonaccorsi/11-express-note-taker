//uses npm package express
const express = require('express');
const path = require('path');

//local host port
const PORT = process.env.PORT || 3001;
//each note needs to have a unique id
const uuid = require('./helpers/uuid.js');
//assigns express to a variable
const app = express();
//uses file system
const fs = require('fs');
//datbase
const notes = require('./db/db.json');
//MIDDLEWARE to connect front end
//look for queries in url
app.use(express.urlencoded({ extended: true }));
//req.body as json
app.use(express.json());
// connects the front end
app.use(express.static('public'));

//frontend
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);
//frontend
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//GET REQUEST LISTENER
app.get('/api/notes', (req, res) => {

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        } else {
            const notes = JSON.parse(data);
            //send all notes to the client
            return res.json(notes);
        }
    });
});

//POST REQUEST LISTENER
app.post('/api/notes', (req, res) => {
    //prepare a response object to send back to the client
    const { title, text } = req.body;

    //check that all required properties are present
    if (title && text) {
        // save object as newNote
        const newNote = {
            title,
            text,
            noteId: uuid(),
        };

        //write the string to a file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                return console.error(err);
                res.status(500).json('Error in making note');
            } else {
                const notes = JSON.parse(data);
                notes.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (err) =>
                    err ? res.status(500).json('Error in making note')
                        : res.json(newNote)
                );
            }
        });
    }
});

//get a single note
app.get('/api/notes/:noteId', (req, res) => {
    console.info(`${req.method} request received to get note by id`);
    for (let i = 0; i < notes.length; i++) {
        const activeNote = notes[i];
        if (activeNote.id === req.params.noteId) {
            activeNote = {};
            return;
        }
    }
    res.status(404).send('Note not found');
});

app.post('api/notes/:noteId', (req, res) => {
    if (req.body && req.params.noteId) {
        console.info(`${req.method} request received for note adjustment`);
        const note_id = req.params.noteId;
        for (let i = 0; i < notes.length; i++) {
            const activeNote = notes[i];
            if (activeNote.id === note_id) {
                activeNote = {};
                return;
            }
        }
    }
});

app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);
