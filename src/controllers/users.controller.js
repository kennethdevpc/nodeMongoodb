const usersCtrl = {};

const passport = require('passport');
const User = require('../models/User');
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: 'Password not match' });
  }
  if (password.length < 4) {
    errors.push({ text: 'password must be at least 4 characters' });
  }
  if (errors.length > 0) {
    res.render('users/signup', {
      errors,
      name,
      email,
      password,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'The mail is already in use');
      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();
      req.flash('success_msg', 'You are registered ');
      res.redirect('/users/signin');
    }
  }
};

//signin
usersCtrl.renderSigninForm = (req, res) => {
  res.render('users/signin');
};
usersCtrl.signin = passport.authenticate('local', {
  failureRedirect: '/users/signin',
  successRedirect: '/notes',
  failureFlash: true,
});

//logout
usersCtrl.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'You are logged out now. Session cerrada');
    res.redirect('/users/signin');
  });
};

module.exports = usersCtrl;
