import { criptomonedasSelect, formulario, resultado } from "../selectores.js";

export default class UI {
  cargarSelectCripto(criptomonedas) {
    criptomonedas.forEach((cripto) => {
      const { FullName, Name } = cripto.CoinInfo;

      const option = document.createElement("option");
      option.textContent = FullName;
      option.value = Name;

      criptomonedasSelect.appendChild(option);
    });
  }

  mostrarAlerta(mensaje) {
    const error = document.querySelector(".error");

    if (error) return;

    const divMensaje = document.createElement("div");

    divMensaje.classList.add("error");
    divMensaje.textContent = mensaje;
    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  mostrarCotizacionHTML(cotizacion) {
    this.limpiarHTML(resultado);
    const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE } = cotizacion;

    const precio = document.createElement("p");
    precio.classList.add("precio");
    precio.innerHTML = `El Precio es: <span>${PRICE}</span>`;

    const precioAlto = document.createElement("p");
    precioAlto.innerHTML = `Precio mas alto del dia: <span>${HIGHDAY}</span>`;

    const precioBajo = document.createElement("p");
    precioBajo.innerHTML = `Precio mas bajo del dia: <span>${LOWDAY}</span>`;

    const cambioDia = document.createElement("p");
    cambioDia.innerHTML = `Porcentaje de cambio en las ultimas 24 horas: <span>${CHANGEPCT24HOUR}%</span>`;

    const ultimoActualizado = document.createElement("p");
    ultimoActualizado.innerHTML = `Actualizado por ultima vez: <span>${LASTUPDATE}</span>`;

    resultado.appendChild(precio);
    resultado.appendChild(precioAlto);
    resultado.appendChild(precioBajo);
    resultado.appendChild(cambioDia);
    resultado.appendChild(ultimoActualizado);
  }
  limpiarHTML(elemento) {
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }

  mostrarSpinner() {
    this.limpiarHTML(resultado);

    const spinner = document.createElement("div");
    spinner.classList.add("spinner");

    spinner.innerHTML = `<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>`;

    resultado.appendChild(spinner);
  }
}
