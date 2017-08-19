const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes');

const titleOption = {
  describe: 'Title of the note',
  demand: true,
  alias: 't'
};
const bodyOption = {
  describe: 'Body of the note',
  demand: true,
  alias: 'b'
};

const argv = yargs
                .command('add', 'Add a note', {
                  title: titleOption,
                  body: bodyOption
                })
                .command('list', 'List all notes')
                .command('read', 'Read a note', {
                  title: titleOption
                })
                .command('remove', 'Remove a note', {
                  title: titleOption
                })
                .command('clear', 'Remove all notes')
                .help()
                .argv;
var command = argv._[0];

switch (command) {
  case 'add':
    var note = notes.addNote(argv.title, argv.body);
    if (!note) {
      console.log('Note already exists');
    } else {
      console.log('Note added successfuly');
      notes.printNote(note);
    }
    break;
  case 'list':
    var allNotes = notes.getAll();
    console.log(allNotes.length ? `Printing ${allNotes.length} note(s):`: 'There are no notes.');
    for (let note of allNotes) {
      console.log(`${note.title}: ${note.body}`);
    }
    break;
  case 'remove':
    var message = (notes.removeNote(argv.title))
                    ? 'Note successfuly removed'
                    : 'Note not found';
    console.log(message);
    break;
  case 'read':
    var note = notes.getNote(argv.title);
    if (!note) {
      console.log('Note not found');
    } else {
      console.log('Note found');
      notes.printNote(note);
    }
    break;
  case 'clear':
    console.log(notes.clear());
    break;
  default:
    console.log(`${command}: this command is not recognized`);
}
