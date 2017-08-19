const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var printNote = (note) => {
  debugger;
  console.log(`Title: ${note.title}\nBody: ${note.body}`);
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {title, body};


  var duplicates = notes.filter(note => note.title === title);

  if (duplicates.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filtered = notes.filter(note => note.title === title);
  return filtered[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var remaining = notes.filter(note => note.title !== title);
  saveNotes(remaining);

  return notes.length !== remaining.length;
}

var clear = () => {
  saveNotes([]);
  return 'The list of notes has been successfuly cleared';
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  clear,
  printNote
};
