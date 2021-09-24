export default class ImagenAPI {
  constructor() {
    this.terminoBusqueda;

    //apikey guardada en ls para evitar subirla a github
    const miStorage = window.localStorage;
    this.appID = miStorage.getItem("api_key_pixabay");
    this.imagenesPorPagina = 30;
    this.paginaActual = 1;
  }

  consultarImagenesAPI = () => {
    const url = `https://pixabay.com/api/?key=${this.appID}&q=${this.terminoBusqueda}&per_page=${this.imagenesPorPagina}&page=${this.paginaActual}`;

    return fetch(url)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.datos = datos;
        //calcular la cantidad de paginas de acuerdo a la cantidad total de imagenes
        this.setCantidadPaginas(datos.totalHits);
      });
  };

  setCantidadPaginas(total) {
    this.cantidadPaginas = parseInt(Math.ceil(total / this.imagenesPorPagina));
  }

  setTerminoBusqueda(terminoBusqueda) {
    this.terminoBusqueda = terminoBusqueda;
  }
}
