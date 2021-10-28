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
//connect to index
//const index =require('index.js')


//MIDDLEWARE to connect front end
//look for queries in url
app.use(express.urlencoded({ extended: true }));
//req.body as json
app.use(express.json());
// connects the front end
app.use(express.static('public'));


app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);


//GET REQUEST LISTENER
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to get notes`);
    //send all notes to the client
    return res.json(notes);
});
//fs.readFile(/db.json) => GET  
//json.stringify(notes)


//POST REQUEST LISTENER
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} received notes`);

    //prepare a response object to send back to the client
    const { noteTitle, noteText } = req.body;

    //check that all required properties are present
    if (noteTitle && noteText) {
        // save object as newNote
        const newNote = {
            noteTitle,
            noteText,
            noteId: uuid(),
        };
        // turn the newNote into a string
        const reviewString = JSON.stringify(newNote);
        //write the string to a file
        fs.writeFile('./db/db.json', reviewString, (err) =>
            err ? console.error(err)
                : console.log(
                    `Note has been created and added to JSON file`
                )
        );

const response = {
    status: 'success',
    body: newNote,
};

console.log(response);
res.status(201).json(response);
    } else {
    res.status(500).json('Error in making note');
}
});

//notesList.push(newNote)
//return(newNote onto noteList)



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