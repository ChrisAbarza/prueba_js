import {
  formulario,
  nombreInput,
  correoInput,
  telefonoInput,
  empresaInput,
} from "./selectores.js";

import UI from "./clases/UI.js";
(function () {
  let DB;

  const ui = new UI();

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();
    formulario.addEventListener("submit", validarCliente);
  });

  //conectar la bd
  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      alert("error de IndexdedDB");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
    };
  }

  function validarCliente(e) {
    e.preventDefault();

    const nombre = nombreInput.value;
    const correo = correoInput.value;
    const telefono = telefonoInput.value;
    const empresa = empresaInput.value;

    if (nombre === "" || correo === "" || telefono === "" || empresa === "") {
      const alerta = document.querySelector(".alerta");

      if (!alerta) {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
      }
      return;
    }
  }
})();
