module.exports = {
  index: function (req, res) {
    var email = req.param('email');
    User.findOne({email: email}, function (err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid email or password'});
      }
      else {
        res.json({
          user: user,
          token: jwToken.issue({id: user.id})
        });
      }
    });
  }
};