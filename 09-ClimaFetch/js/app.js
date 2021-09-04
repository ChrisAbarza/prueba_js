import {
  container,
  resultado,
  formulario,
  ciudadinput,
  paisInput,
} from "./selectores.js";

import UI from "./clases/UI.js";

const ui = new UI();

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //validar
  //
  const ciudad = ciudadinput.value;
  const pais = paisInput.value;

  if (ciudad === "" || pais === "") {
    ui.mostrarError("Se requiere Pais y Ciudad");
    return;
  }
}
