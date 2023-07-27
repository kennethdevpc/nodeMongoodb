const notesCtrl = {};
//llamando el modelo de la nota)
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};
notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  await newNote.save();

  console.log(newNote);
  res.send('note createNewNote');
};
notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find().lean();
  console.log(notes);
  res.render('notes/all-notes', { notes });
};
notesCtrl.renderEditForm = (req, res) => {
  res.send('render edit form');
};
notesCtrl.updateNote = (req, res) => {
  res.send('updatenote');
};
notesCtrl.deleteNote = (req, res) => {
  res.send('delete note');
};
module.exports = notesCtrl;
