import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", (e) => {
    const urlProyecto = btnEliminar.dataset.proyectoUrl;

    Swal.fire({
      title: "¿Deseas eliminar este proyecto?",
      text: "Un proyecto eliminado no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Enviar peticion a axios
        const url = `${location.origin}/proyectos/${urlProyecto}`;
        axios
          .delete(url, { params: { urlProyecto } })
          .then((respuesta) => {
            console.log(respuesta);

            Swal.fire({
              title: "Eliminado!",
              text: respuesta.data,
              icon: "success",
            });

            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              type: "error",
              title: "Hubo un Error!",
              text: "No se pudo eliminar el Proyecto",
              icon: "error",
            });
          });
      }
    });
  });
}

export default btnEliminar;
