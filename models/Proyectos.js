const Sequalize = require("sequelize");
const db = require("../config/db");
const slug = require("slug").default; // Las versiones recientes necesitan el .default
const shortid = require("shortid");

const Proyectos = db.define(
    "proyectos",
    {
        id: {
            type: Sequalize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: Sequalize.STRING(100),
        url: Sequalize.STRING(100),
    },
    {
        hooks: {
            beforeCreate(proyecto) {
                const url = slug(proyecto.nombre).toLowerCase();
                proyecto.url = `${url}-${shortid.generate()}`; // Genera un id cortito aleatorio
            },
            //Se podria cambiar el url cuando se actualiza, pero la mayoria no lo hace por practisidad
        },
    }
);

module.exports = Proyectos;
