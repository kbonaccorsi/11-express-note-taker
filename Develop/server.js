//uses npm package express
const express = require('express');
const path = require('path');
//location to view front end
const PORT = 3001;
//each note needs to have a unique id
const uuid = require('./helpers/uuid.js');
//database holding all of the notes
const notes = require('./db/db.json');
//
const app = express();
//uses file system
const fs = require('fs');


//MIDDLEWARE to connect front end
//look for queries in url
app.use(express.urlencoded({ extended: true }));
//req.body as json
app.use(express.json());
// connects the front end
app.use(express.static('public'));


app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//GET REQUEST LISTENER
app.get('/api/notes', (req, res) => {
    console.info(`GET request 37 received to get notes`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            return console.error(err);
        }else {
        const notes = JSON.parse(data);
        //send all notes to the client
        return res.json(notes);
    }
    });
});

//POST REQUEST LISTENER
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} received notes`);

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

        console.log(newNote);
        //write the string to a file
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                return console.error(err);
                res.status(500).json('Error in making note');
            } else {
                console.log('so far so good')
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




//DELETE REQUEST LISTENER
// app.delete('/api/notes/:noteId', (req, res) => {
//     if (req.body && req.params.noteId) {
//     console.info (`${req.method} deleting note`);
//     const note_id = req.params.noteId;
//     for (let i = 0; i < reviews.length; i++) {
//         const noteListItems = noteList[i];
//         if(noteListItems.noteId === note_id) {
//             res.status(200).json(noteListItem);
//             return;
//         }
//     }
//     res.status(404).send('Note not found');
//     } else {
//         res.status(400).send('Note ID not provided');
//     }
// });

//fs.readFile(/db.json) for each (noteListEl) containing noteId
//fs.(remove) noteId from noteList
//fs.rewriteFile(/db.json) => DELETE


app.listen(PORT, () =>
    console.log(`Express server listening on port ${PORT}!`)
);

//notesList displays immediately after click
//After entering noteTitle AND noteText, save button appears (await appear)
// save icon pushes newNote object to existing noteList array
//noteList array is rewritten to include newNote
//(await appear) existing note becomes editable as newNote
//write icon emptys newNote fields