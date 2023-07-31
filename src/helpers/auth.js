const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // retorna y no va a continuar con lo que esta debajo
  }
  req.flash('error_msg', 'Not authorized');
  res.redirect('/users/signin');
};

module.exports = helpers;
