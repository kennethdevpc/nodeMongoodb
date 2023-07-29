const usersCtrl = {};
usersCtrl.renderSignUpForm = (req, res) => {
  res.render('users/signup');
};

usersCtrl.signup = (req, res) => {
  res.send('signup');
};

//signin
usersCtrl.renderSigninForm = (req, res) => {
  res.render('users/signin');
};
usersCtrl.signin = (req, res) => {
  res.send('signin');
};

//logout
usersCtrl.logout = (req, res) => {
  res.send('logout');
};

module.exports = usersCtrl;
