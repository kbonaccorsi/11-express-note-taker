//uses npm package express
const express = require('express');
//uses file system
const fs = require('fs');

//each note needs to have a unique id
const uuid = require('uuid');

//connect to /db.json
const notesData = require('./db/db.json');

//connect to index
const index =require('index.js')
//http://localhost:3001;
const POST = 3001;

// //MIDDLEWARE to connect front end
//app.get(*) from (./index.html)
//app.get(/notes) from (./notes.html)


// //GET
//app.get(/api/notes) //fs.readFile(/db.json) => GET  //json.stringify(notes)


// //POST
//app.post(/api/notes)(receive- newNote) => {
//res.body(newNote)
//const newNote => {
//     noteTitle,
//     noteText,
//     noteid(uuid);
// }
//fs.writeFile(/db.json) => POST //json(newNote)
//notesList.push(newNote)
//return(newNote onto noteList)
//};


// //DELETE
//app.delete(/api/notes/:id) (receive q param - noteId)
//fs.readFile(/db.json) for each (noteListEl) containing noteId
//fs.(remove) noteId from noteList
//fs.rewriteFile(/db.json) => DELETE


//app.listen(POST)



//index.html is welcome screen
//get notes link works
//notes link redirects to notes list/ new note form
//After entering noteTitle AND noteText, save button appears (await appear)
// save icon pushes newNote object to existing noteList array
//noteList array is rewritten to include newNote
//(await appear) existing note becomes editable as newNote
//write icon emptys newNote fields