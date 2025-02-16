import Swal from "sweetalert2";

export const actualizarAvance = () => {
    //Seleccionar las tareas existentes
    const tareas = document.querySelectorAll("li.tarea");

    if (tareas.length) {
        //Seleccionar las tareas completas
        const tareasCompletas = document.querySelectorAll("i.completo");
        //Calcular el porcentaje de avance
        const avance = Math.round(
            (tareasCompletas.length / tareas.length) * 100
        );
        //Mostrar el porcentaje de avance
        const porcentaje = document.querySelector("#porcentaje");
        porcentaje.style.width = avance + "%";

        if (avance === 100) {
            Swal.fire({
                title: "Completaste el Proyecto",
                text: "Felicidades, has terminado tus tareas",
                icon: "success",
            });
        }
    }
};
