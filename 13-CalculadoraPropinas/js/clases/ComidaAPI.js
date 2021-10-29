export default class ComidaAPI {
  constructor() {
    this.url = "http://localhost";
    this.port = 3000;
    this.completeURL = `${this.url}:${this.port}`;
  }
  async consultarPlatillos() {
    const urlConsulta = `${this.completeURL}/platillos`;
    return fetch(urlConsulta)
      .then((respuesta) => respuesta.json())
      .catch((error) => alert("Error al consultar los platillos: " + error));
  }
}
