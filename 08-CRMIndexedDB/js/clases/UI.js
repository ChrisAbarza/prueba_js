import {
  formulario,
  nombreInput,
  correoInput,
  telefonoInput,
  empresaInput,
  idInput,
} from "../selectores.js";

export default class UI {
  imprimirAlerta(mensaje, tipo) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add(
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "border"
    );

    if (tipo === "error") {
      divMensaje.classList.add(
        "bg-red-100",
        "border-red-400",
        "text-red-700",
        "alerta"
      );
    } else {
      divMensaje.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
      formulario.reset();
      setTimeout(() => {
        window.location.href = "index.html";
      }, 3000);
    }

    divMensaje.textContent = mensaje;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
  llenarFormularioEdit(cliente) {
    const { nombre, correo, telefono, empresa, id } = cliente;

    nombreInput.value = nombre;
    correoInput.value = correo;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
    idInput.value = id;
  }
}
