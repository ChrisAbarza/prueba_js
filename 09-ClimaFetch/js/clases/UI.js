import { container, formulario, resultado } from "../selectores.js";
export default class UI {
  mostrarError(mensaje) {
    const existeAlerta = document.querySelector(".error");

    if (existeAlerta) {
      return;
    }

    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
      "error"
    );

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
      formulario.reset();
    }, 3000);
  }

  mostrarClima(datos) {
    this.limpiarHTML();
    //destructuring de multiples niveles
    const {
      name,
      main: { temp, temp_max, temp_min },
      sys: { country },
      weather: {
        0: { description },
      },
    } = datos;

    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name} (${country})`;
    nombreCiudad.classList.add("font-bold", "text-2xl");

    const informeClima = document.createElement("p");
    informeClima.textContent = `${description}`;
    informeClima.classList.add("font-bold", "text-2xl");

    const actual = document.createElement("p");
    actual.innerHTML = `${parseInt(temp)} &#8451`;
    actual.classList.add("font-bold", "text-6xl");

    const tempMaxima = document.createElement("p");
    tempMaxima.innerHTML = `Max: ${parseInt(temp_max)} &#8451`;
    tempMaxima.classList.add("text-xl");

    const tempMinima = document.createElement("p");
    tempMinima.innerHTML = `Min: ${parseInt(temp_min)} &#8451`;
    tempMinima.classList.add("text-xl");

    const resultadoDiv = document.createElement("div");
    resultadoDiv.classList.add("text-center", "text-white");

    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(informeClima);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

    formulario.reset();
  }

  limpiarHTML() {
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }
  spinner() {
    this.limpiarHTML();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-fading-circle");

    divSpinner.innerHTML = `
      <div class="sk-circle1 sk-circle"></div>
      <div class="sk-circle2 sk-circle"></div>
      <div class="sk-circle3 sk-circle"></div>
      <div class="sk-circle4 sk-circle"></div>
      <div class="sk-circle5 sk-circle"></div>
      <div class="sk-circle6 sk-circle"></div>
      <div class="sk-circle7 sk-circle"></div>
      <div class="sk-circle8 sk-circle"></div>
      <div class="sk-circle9 sk-circle"></div>
      <div class="sk-circle10 sk-circle"></div>
      <div class="sk-circle11 sk-circle"></div>
      <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
  }
}
