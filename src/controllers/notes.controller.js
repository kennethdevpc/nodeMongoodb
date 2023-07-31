const notesCtrl = {};
//llamando el modelo de la nota)
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note');
};
notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body;
  const newNote = new Note({ title, description });
  newNote.user = req.user.id;
  await newNote.save();
  req.flash('success_msg', 'Note add successfuly');
  console.log(newNote);
  res.redirect('/notes');
};
notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
  console.log(notes);
  res.render('notes/all-notes', { notes });
};
notesCtrl.renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', 'Not authorized to edit this note');
    res.redirect('/notes');
  }
  console.log(note);
  res.render('notes/edit-note', { note });
};
notesCtrl.updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash('success_msg', 'Note Update successfully');

  res.redirect('/notes');
};
notesCtrl.deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash('error_msg', 'Not authorized to edit this note');
    res.redirect('/notes');
  }
  await Note.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Note Delete successfully');

  res.redirect('/notes');
};
module.exports = notesCtrl;
