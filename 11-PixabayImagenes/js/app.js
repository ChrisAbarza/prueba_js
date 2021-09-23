import { formulario, terminoBusqueda } from "./selectores.js";

import UI from "./clases/UI.js";
import ImagenAPI from "./clases/ImagenAPI.js";

const ui = new UI();

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
};

function validarFormulario(e) {
  e.preventDefault();

  const textoBuscado = terminoBusqueda.value;

  if (textoBuscado === "") {
    ui.mostrarAlerta("Ingresar un término de búsqueda...");
    return;
  }

  //fetch api con clases
  (async () => {
    const imagenApi = new ImagenAPI(textoBuscado);
    if (!imagenApi.appID) {
      ui.mostrarAlerta(
        'No hay una apikey valida guardada en localStorage, favor guardarla bajo la llave "api_key_pixabay"'
      );
      return;
    }
    imagenApi.consultarImagenesAPI().then(() => {
      if (imagenApi.datos.total > 0) {
        ui.mostrarImagenes(imagenApi.datos.hits);
      } else {
        ui.mostrarAlerta(
          `No se encontraron resultados para "${textoBuscado}"... `
        );
      }
    });
  })();
}
