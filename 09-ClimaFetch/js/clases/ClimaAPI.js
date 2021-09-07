export default class ClimaAPI {
  constructor(ciudad, pais) {
    this.appID = "4c28a7bf35cf9ea1907bce7b93b41dff";
    this.ciudad = ciudad;
    this.pais = pais;
  }
  consultarAPI = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.ciudad},${this.pais}&units=metric&appid=${this.appID}&lang=es`;

    return fetch(url)
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        this.datos = datos;
      });
  };
}
