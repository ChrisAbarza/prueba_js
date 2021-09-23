import { formulario, ciudadinput, paisInput } from "./selectores.js";

import UI from "./clases/UI.js";

import ClimaAPI from "./clases/ClimaAPI.js";

const ui = new UI();

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  ui.limpiarHTML();
  //validar
  //
  const ciudad = ciudadinput.value;
  const pais = paisInput.value;

  if (ciudad === "" || pais === "") {
    ui.mostrarError("Se requiere Pais y Ciudad");
    return;
  }

  //async con clases
  (async () => {
    const climaApi = new ClimaAPI(ciudad, pais);
    if (!climaApi.appID) {
      ui.mostrarError(
        'No hay una apikey valida guardada en localStorage, favor guardarla bajo la llave "api_key_weather"'
      );
      return;
    }
    ui.spinner();
    climaApi.consultarAPI().then(() => {
      gestionarRespuesta(climaApi.datos);
    });
  })();
}

function gestionarRespuesta(datos) {
  const { cod } = datos;
  if (Number(cod) !== 200) {
    ui.mostrarError(`Error: ${datos.cod}, Mensaje: "${datos.message}"`);
    ui.limpiarHTML();

    return;
  }

  ui.mostrarClima(datos);
}
