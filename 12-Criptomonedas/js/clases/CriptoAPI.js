export default class CriptoAPI {
  constructor() {
    this.maxListadoCripto = 10;
  }
  async consultarCriptomonedas() {
    const urlListadoCripto = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${this.maxListadoCripto}&tsym=USD`;

    return fetch(urlListadoCripto)
      .then((respuesta) => respuesta.json())
      .then((datos) => datos.Data);
  }

  async cotizarCripto(moneda, criptomoneda) {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

    return fetch(url)
      .then((respuesta) => respuesta.json())
      .then((datos) => datos.DISPLAY[criptomoneda][moneda]);
  }
}
