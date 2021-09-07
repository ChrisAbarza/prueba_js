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
}
