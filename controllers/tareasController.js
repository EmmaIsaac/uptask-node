const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.AgregarTarea = async (req, res, next) => {
    //obtener el proyecto actual
    const proyecto = await Proyectos.findOne({
        where: {
            url: req.params.url,
        },
    });

    //Leer el valor del input
    const { tarea } = req.body;
    //estado 0 = incompleto
    const estado = 0;
    const proyectoId = proyecto.id;

    //Insertar en la BD
    const resuldado = await Tareas.create({ tarea, estado, proyectoId });

    if (!resuldado) {
        return next();
    }

    //redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
};

exports.cambiarEstadoTarea = async (req, res, next) => {
    const { id } = req.params;
    const tarea = await Tareas.findOne({ where: { id } });

    let estado = 0;

    if (tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if (!resultado) {
        return next();
    }

    res.status(200).send("Actualizado");
};

exports.eliminarTarea = async (req, res, next) => {
    const { id } = req.params;
    const resultado = await Tareas.destroy({ where: { id } });
    if (!resultado) {
        return next();
    }
    res.status(200).send("Tarea Eliminada Correctamente");
};
