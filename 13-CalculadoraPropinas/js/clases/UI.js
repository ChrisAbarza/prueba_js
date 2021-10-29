import { ubicacionAlerta } from "../selectores.js";

export default class UI {
  mostrarError(mensaje) {
    const existeError = document.querySelector(".invalid-feedback");
    if (existeError) return;
    const alerta = document.createElement("div");
    alerta.classList.add("invalid-feedback", "d-block", "text-center");
    alerta.textContent = mensaje;

    ubicacionAlerta.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

  ocultarModal() {
    const modalFormulario = document.querySelector("#formulario");
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();
  }
  mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll(".d-none");
    seccionesOcultas.forEach((seccion) => seccion.classList.remove("d-none"));
  }
}
