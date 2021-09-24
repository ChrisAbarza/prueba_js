import { formulario, terminoBusqueda, paginacionDiv } from "./selectores.js";

import UI from "./clases/UI.js";
import ImagenAPI from "./clases/ImagenAPI.js";

const ui = new UI();
const imagenApi = new ImagenAPI();

window.onload = () => {
  formulario.addEventListener("submit", validarFormulario);
  paginacionDiv.addEventListener("click", direccionPaginacion);
};

function validarFormulario(e) {
  e.preventDefault();

  const textoBuscado = terminoBusqueda.value;

  if (textoBuscado === "") {
    ui.mostrarAlerta("Ingresar un término de búsqueda...");
    return;
  }
  ui.iteradorSiguiente = null;
  imagenApi.paginaActual = 1;
  imagenApi.setTerminoBusqueda(textoBuscado);

  buscarImagenes();
}

function buscarImagenes() {
  //fetch api con clases
  (async () => {
    if (!imagenApi.appID) {
      ui.mostrarAlerta(
        'No hay una apikey valida guardada en localStorage, favor guardarla bajo la llave "api_key_pixabay"'
      );
      return;
    }
    imagenApi.consultarImagenesAPI().then(() => {
      if (imagenApi.datos.total > 0) {
        ui.mostrarImagenes(imagenApi.datos.hits, imagenApi.cantidadPaginas);
      } else {
        ui.mostrarAlerta(
          `No se encontraron resultados para "${textoBuscado}"... `
        );
      }
    });
  })();
}

function direccionPaginacion(e) {
  if (e.target.classList.contains("siguiente")) {
    let paginaActual = Number(e.target.dataset.pagina);
    imagenApi.paginaActual = paginaActual;
    buscarImagenes();

    formulario.scrollIntoView();
  }
}
