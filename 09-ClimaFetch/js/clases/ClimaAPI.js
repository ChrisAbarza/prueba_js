export default class ClimaAPI {
  constructor(ciudad, pais) {
    //apikey guardada en ls para evitar subirla a github
    const miStorage = window.localStorage;
    this.appID = miStorage.getItem("api_key_weather");
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
