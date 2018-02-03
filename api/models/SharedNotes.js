
module.exports = {
  schema : true,
  attributes: {
    sender_email: {
      type: 'email',
      required: true
    },
    reciever_email: {
      type: 'email',
      required: true
    },
    note: {
      type: 'String',
      required: true
    },
    title: {
      type: 'String'
    },
    color: {
      type: 'String'
    },
    tag: {
      type: 'String'
    },
    fcm_token: {
      type: 'String'
}
  },
  shareNote: function (req, res) {
    User.findOne({email: req.body.reciever_email}, function (err, email) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (email) {
        SharedNotes.create(req.body).exec(function (err, sharednotes) {
          if (err) {
            return res.json(err.status, {err: err});
          }
          // If user created successfuly we return user and token as response
          if (sharednotes) {
            // NOTE: payload is { id: user.id}
            res.json(200, {SharedNotes: sharednotes});
          }
        });
      }

      else {
        res.json(200, {result:'email not found'});
      }
    });
  },
  SharedNotes:function (req, res) {
    SharedNotes.find({reciever_email: req.body.reciever_email}, function (err, sharednote) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200, sharednote);
      }
    });
  },
  getEditSharedNote: function (req, res) {
    SharedNotes.findOne({$and :[{reciever_email:req.body.reciever_email},{note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else {
        res.json(200,note);
      }
    });
  },
  editSharedNote: function (req, res) {
    editnote = req.body.note;
    SharedNotes.findOne({id: req.body.id}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        SharedNotes.update({id: req.body.id}, {
          note: editnote,
          title: req.body.title,
          tag: req.body.tag,
          color: req.body.color
        }, function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(note);
          }
        });
      }
      else {
        res.json(200, note);
      }


});
  },
  deleteSharedNote: function (req, res) {
    SharedNotes.findOne({$and: [{reciever_email: req.body.reciever_email}, {note: req.body.note}]}, function (err, note) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      else if (note) {
        SharedNotes.destroy({id: note.id}).exec(function (err, result) {
          if (err) {
            res.json(err);
          }
          else {
            res.json({delete: 'note deleted'});
          }

        });
      }

      else {
        res.json(200, {not_found: 'note not found'});
      }
    });
  }

};