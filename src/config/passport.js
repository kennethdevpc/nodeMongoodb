const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      //Match email's user
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Not user found, error desde passport' });
      } else {
        //Match Password's User
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      }
    }
  )
);

//passport tiene otras funcionalidades, para guardar el ususario :
//Cuando se registra el usuario se registra en la session de nuestro servidor
passport.serializeUser((user, done) => {
  done(null, user.id);
});
//Cuando el usuario ya esta registrado, se hace la consulta en la base de datos si tiene la autorizacion
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null); //esta es una funcion de callback que si hay error retorna error sino el ususario
    });
});
