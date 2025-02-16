const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
    router.get(
        "/",
        authController.usuarioAutenticado,
        proyectosController.proyectosHome
    );
    router.get(
        "/nuevo-proyecto",
        authController.usuarioAutenticado,
        proyectosController.formularioProyecto
    );
    router.post(
        "/nuevo-proyecto",
        [
            authController.usuarioAutenticado,
            body("nombre").not().isEmpty().trim().escape(), //trim es para espacios y escape para los caracteres especiales
            //Falta validar campos
        ],
        proyectosController.nuevoProyecto
    );
    // Listar proyectos
    router.get(
        "/proyectos/:url",
        authController.usuarioAutenticado,
        proyectosController.proyectoPorUrl
    );

    //Actualizar proyecto
    router.get(
        "/proyectos/editar/:id",
        authController.usuarioAutenticado,
        proyectosController.formularioEditar
    );
    router.post(
        "/nuevo-proyecto/:id",
        [
            authController.usuarioAutenticado,
            body("nombre").not().isEmpty().trim().escape(), //trim es para espacios y escape para los caracteres especiales
            //Falta validar campos
        ],
        proyectosController.actualizarProyecto
    );

    //Eliminar proyecto
    router.delete(
        "/proyectos/:url",
        authController.usuarioAutenticado,
        proyectosController.eliminarProyecto
    );

    //Tareas
    router.post(
        "/proyectos/:url",
        authController.usuarioAutenticado,
        tareasController.AgregarTarea
    );

    //Actualizar tareas
    router.patch(
        "/tareas/:id",
        authController.usuarioAutenticado,
        tareasController.cambiarEstadoTarea
    );

    //Eliminar tareas
    router.delete(
        "/tareas/:id",
        authController.usuarioAutenticado,
        tareasController.eliminarTarea
    );

    //Crear nueva cuenta
    router.get("/crear-cuenta", usuariosController.formCrearCuenta);
    router.post("/crear-cuenta", usuariosController.crearCuenta);

    //Iniciar Sesion
    router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
    router.post("/iniciar-sesion", authController.autenticarUsuario);

    //Cerrar Sesion
    router.get("/cerrar-sesion", authController.cerrarSesion);

    return router;
};
