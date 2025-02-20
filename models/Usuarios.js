const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("./Proyectos");
const bcrypt = require("bcryptjs");

const Usuarios = db.define(
    "usuarios",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: Sequelize.STRING(60),
            allowNull: false, //Significa que no puede ser nulo
            validate: {
                isEmail: {
                    msg: "Agrega un correo valido",
                },
                notEmpty: {
                    msg: "El email no puede ir vacio",
                },
            },
            unique: {
                args: true,
                msg: "Usuario ya registrado",
            },
        },
        password: {
            type: Sequelize.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "El password no puede ir vacio",
                },
            },
        },
    },
    {
        hooks: {
            beforeCreate: (usuario) => {
                usuario.password = bcrypt.hashSync(
                    usuario.password,
                    bcrypt.genSaltSync(10)
                );
            },
        },
    }
);

//Metodos personalizados
Usuarios.prototype.verifcarPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos); // Agrega usuarioId al modelo de proyectos
module.exports = Usuarios;
