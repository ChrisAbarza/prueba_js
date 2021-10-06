import { criptomonedasSelect } from "../selectores.js";

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
}
