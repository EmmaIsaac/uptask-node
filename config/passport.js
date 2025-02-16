const passport = require("passport"); // Se encarga de la autenticacion
const LocalStrategy = require("passport-local").Strategy;
// Referencia al modelo que vamos a autenticar
const Usuarios = require("../models/Usuarios");

// local strategy - login con credenciales de usuario
passport.use(
    new LocalStrategy(
        // Por default passport usa username y password
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, done) => {
            try {
                const usuario = await Usuarios.findOne({
                    where: { email: email },
                });
                //El usuario existe, pero password incorrecto
                if (!usuario.verifcarPassword(password)) {
                    return done(null, false, {
                        message: "Password Incorrecto",
                    });
                }
                //El usuario existe y password correcto
                return done(null, usuario);
            } catch (error) {
                //Ese usuario no existe
                return done(null, false, {
                    message: "Ese usuario no existe",
                });
            }
        }
    )
);

//Serializar el usuario
// passport.serializeUser((usuario, callback) => {
//   callback(null, usuario.id);
// });

//Deserializar el usuario
// passport.deserializeUser((usuario, callback) => {
//   callback(null, usuario);
// });

// COmo indica chatgpt
//Si lo hacia como esta arriba, req.user seria undefined
//Sin req.user no puedo tener res.locals.usuario para diferenciar a los usuarios logeados
//Solo asi, puedo diferenciar poryectos por autor y mostrarselos en el feed
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await Usuarios.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
