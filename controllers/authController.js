const passport = require("passport");

exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
    failureFlash: true,
    badRequestMessage: "Ambos campos son obligatorios",
});

// Funcion para revizar si el usuario esta autenticado
exports.usuarioAutenticado = (req, res, next) => {
    //La funcion isAuthenticated nos dice si el usuario esta logueado
    if (req.isAuthenticated()) {
        return next();
    }
    // Si no esta logueado
    return res.redirect("/iniciar-sesion");
};

// Funcion para cerrar sesion
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/iniciar-sesion"); //al cerrar la sesion se redirecciona a la pagina de iniciar sesion
    });
};
