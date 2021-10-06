export default class CriptoAPI {
  constructor() {
    this.maxListadoCripto = 10;
  }
  consultarCriptomonedas() {
    const urlListadoCripto = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${this.maxListadoCripto}&tsym=USD`;

    return fetch(urlListadoCripto)
      .then((respuesta) => respuesta.json())
      .then((datos) => this.obtenerCriptomonedas(datos.Data));
  }

  obtenerCriptomonedas(datos) {
    return new Promise((resolve) => {
      resolve(datos);
    });
  }
}
