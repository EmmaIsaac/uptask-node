const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("./config/passport");

// helpers
const helpers = require("./helpers");

// Crear la conexion a la BD
const db = require("./config/db");
// Importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync() // {force: true} para poder usar Usuarios.hasMany(Proyectos); - Despues de usarlo, borrarlo de sync
    .then(() => {
        console.log("Conexión exitosa a la BD");
    })
    .catch((err) => {
        console.log("Error al conectar a la BD", err);
    });

const app = express();

// Donde cargar los archivos estaticos
app.use(express.static("public"));
// Habilitar Pug
app.set("view engine", "pug");
// Añadir la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

// Habilitar flash messages
app.use(flash());

// Habilitar cookieParser
app.use(cookieParser());

// Habilitar sessiones - Paran navegar entre paginas sin volver a autenticarse
app.use(
    session({
        secret: "supersecreto",
        resave: false,
        saveUninitialized: false,
    })
);

// Inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Pasar vardump a la aplicación
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null;
    next();
});
// Habilitar body parser para recibir datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes());

app.listen(3000, () => {
    console.log("El servidor está corriendo en: http://localhost:3000");
});

// 24-UpTask- Como restablecer Password de los usuarios
