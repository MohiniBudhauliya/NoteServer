module.exports = {
  shareNote: function (req, res) {
    SharedNotes.shareNote(req, res);
  },
  SharedNotes:function (req, res) {
    SharedNotes.SharedNotes(req, res);
  },
  deleteSharedNote: function (req, res) {
    SharedNotes.deleteSharedNote(req,res);
  },
  editSharedNote: function (req, res) {
    SharedNotes.editSharedNote(req,res);
},
FirebaseNotification:function(req,res)
  {
    SharedNotes.FirebaseNotification(req,res);
  }
  
};
