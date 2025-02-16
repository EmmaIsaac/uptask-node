const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, res) => {
    // console.log(res.locals.usuario);
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    //Antes se traian todos los proyectos, pero se limito la busqueda por el id de usuario
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    res.render("index", { nombrePagina: "Proyectos", proyectos });
};

exports.formularioProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    res.render("nuevoProyecto", { nombrePagina: "Nuevo Proyecto", proyectos });
};

exports.nuevoProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    // Enviar a la consola
    // console.log(req.body);

    // Validar que los campos no esten vacios
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ texto: "Agrega un nombre al proyecto" });
    }
    // Si hay errores
    if (errores.length > 0) {
        res.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos,
        });
    } else {
        // No hay errores
        // Insertar en la BD
        const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
        await Proyectos.create({ nombre, usuarioId });
        res.redirect("/");
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    const { url } = req.params;
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyectos.findOne({ where: { url, usuarioId } });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise,
    ]);

    //Consultar las tareas del proyecto
    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id,
        },
        // include: [{ model: Proyectos }],
    });

    if (!proyecto) return next();
    // Render a la vista
    res.render("tareas", {
        nombrePagina: "Tareas del Proyecto",
        proyecto,
        proyectos, //Estos son los proyectos que se iteran en el layout
        tareas,
    });
};

exports.formularioEditar = async (req, res) => {
    const { id } = req.params;
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    const proyectosPromise = Proyectos.findAll({ where: { usuarioId } });
    const proyectoPromise = Proyectos.findOne({ where: { id, usuarioId } });

    const [proyectos, proyecto] = await Promise.all([
        proyectosPromise,
        proyectoPromise,
    ]);

    res.render("nuevoProyecto", {
        nombrePagina: "Editar Proyecto",
        proyectos,
        proyecto,
    });
};

exports.actualizarProyecto = async (req, res) => {
    const usuarioId = res.locals.usuario.dataValues.id; //importante el dataValues
    const proyectos = await Proyectos.findAll({ where: { usuarioId } });
    const { nombre } = req.body;

    let errores = [];

    if (!nombre) {
        errores.push({ texto: "Agrega un nombre al proyecto" });
    }
    // Si hay errores
    if (errores.length > 0) {
        res.render("nuevoProyecto", {
            nombrePagina: "Nuevo Proyecto",
            errores,
            proyectos,
        });
    } else {
        // No hay errores
        // Insertar en la BD
        await Proyectos.update({ nombre }, { where: { id: req.params.id } });
        res.redirect("/");
    }
};

exports.eliminarProyecto = async (req, res, next) => {
    const { urlProyecto } = req.query;
    const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });
    if (!resultado) {
        return next();
    }
    res.status(200).send("Proyecto Eliminado Correctamente");
};
