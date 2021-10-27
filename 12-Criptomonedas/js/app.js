import { criptomonedasSelect, formulario, monedaSelect } from "./selectores.js";
import CriptoAPI from "./clases/CriptoAPI.js";
import UI from "./clases/UI.js";

const ui = new UI();
const cripto = new CriptoAPI();

const objBusqueda = {
  moneda: "",
  criptomoneda: "",
};

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();

  formulario.addEventListener("submit", submitFormulario);
  criptomonedasSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

function consultarCriptomonedas() {
  (async () => {
    cripto.consultarCriptomonedas().then((datos) => {
      ui.cargarSelectCripto(datos);
    });
  })();
}

function submitFormulario(e) {
  e.preventDefault();

  const { moneda, criptomoneda } = objBusqueda;

  if (moneda == "" || criptomoneda == "") {
    ui.mostrarAlerta("Ambos campos son obligatorios...");
    return;
  }

  consultarApi();
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function consultarApi() {
  const { moneda, criptomoneda } = objBusqueda;

  ui.mostrarSpinner();

  (async () => {
    cripto.cotizarCripto(moneda, criptomoneda).then((datos) => {
      ui.mostrarCotizacionHTML(datos);
    });
  })();
}
