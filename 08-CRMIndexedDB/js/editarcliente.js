import UI from "./clases/UI.js";
import {
  formulario,
  nombreInput,
  correoInput,
  telefonoInput,
  empresaInput,
  idInput,
} from "./selectores.js";

(function () {
  let DB;
  const ui = new UI();
  document.addEventListener("DOMContentLoaded", () => {
    //actualizar registro
    formulario.addEventListener("submit", actualizarCliente);

    conectarDB();
    //verificar id de url
    const parametrosURL = new URLSearchParams(window.location.search);

    const idCliente = parametrosURL.get("id");

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readonly");

    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();
    cliente.onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          ui.llenarFormularioEdit(cursor.value);
        }

        cursor.continue();
      }
    };
  }

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

  function actualizarCliente(e) {
    e.preventDefault();

    const nombre = nombreInput.value;
    const correo = correoInput.value;
    const telefono = telefonoInput.value;
    const empresa = empresaInput.value;
    const id = idInput.value;

    if (
      nombre === "" ||
      correo === "" ||
      telefono === "" ||
      empresa === "" ||
      id === ""
    ) {
      const alerta = document.querySelector(".alerta");

      if (!alerta) {
        ui.imprimirAlerta("Todos los campos son obligatorios", "error");
      }
      return;
    }

    const clienteActualizado = {
      nombre,
      correo,
      empresa,
      telefono,
    };

    clienteActualizado.id = Number(id);

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    //.put para actualizar registros UPDATE
    objectStore.put(clienteActualizado);

    transaction.oncomplete = () => {
      ui.imprimirAlerta("Editado correctamente", "correcto");
    };

    transaction.onerror = (e) => {
      ui.imprimirAlerta(`${e.target.error}`, "error");
    };
  }
})();
