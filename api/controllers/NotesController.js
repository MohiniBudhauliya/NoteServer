module.exports = {
  add: function (req, res) {
    Notes.add(req, res);
  },
  getNotes: function (req, res) {

    Notes.getNotes(req, res);
  },
  editNote: function (req, res) {
    Notes.editNote(req, res);
  },
  deleteNote: function (req, res) {
    Notes.deleteNote(req,res);
  }



};
