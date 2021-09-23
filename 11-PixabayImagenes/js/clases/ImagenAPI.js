export default class ImagenAPI {
  constructor(terminoBusqueda) {
    this.terminoBusqueda = terminoBusqueda;

    //apikey guardada en ls para evitar subirla a github
    const miStorage = window.localStorage;
    this.appID = miStorage.getItem("api_key_pixabay");
  }

  consultarImagenesAPI = () => {
    const url = `https://pixabay.com/api/?key=${this.appID}&q=${this.terminoBusqueda}`;

    return fetch(url)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.datos = datos;
      });
  };
}
