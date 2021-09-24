import { formulario, resultado, paginacionDiv } from "../selectores.js";

export default class UI {
  constructor() {
    this.iteradorSiguiente;
  }
  mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector(".error");

    if (existeAlerta) {
      return;
    }
    const alerta = document.createElement("p");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "error"
    );

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    formulario.appendChild(alerta);

    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }

  mostrarImagenes(imagenes, cantidadPaginas) {
    this.limpiarSelector(resultado);

    imagenes.forEach((imagen) => {
      const { previewURL, likes, views, largeImageURL } = imagen;
      //para formatear valores numericos
      var nf = Intl.NumberFormat();

      resultado.innerHTML += `
	<div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
	  <div class="bg-white">
	    <img class="w-full" src="${previewURL}">

	    <div class="p-4">
	      <p class="font-bold">${nf.format(
          likes
        )} <span class="font-light">Me gusta</span></p>
	      <p class="font-bold">${nf.format(
          views
        )} <span class="font-light">Vistas</span></p>

	      <a href="${largeImageURL}" class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" target="_blank" rel="noopener noreferrer" >Ver Imagen</a>
	    </div>
	  </div>
	</div>
      `;
    });

    if (!this.iteradorSiguiente) {
      this.limpiarSelector(paginacionDiv);
      this.mostrarPaginacion(cantidadPaginas);
    }
  }

  mostrarPaginacion(cantidadPaginas) {
    this.iteradorSiguiente = this.crearPaginacion(cantidadPaginas);

    while (true) {
      const { value, done } = this.iteradorSiguiente.next();

      if (done) return;

      //crear Boton de siguiente en paginacion
      const botonSiguiente = document.createElement("a");
      botonSiguiente.href = "#";
      botonSiguiente.dataset.pagina = value;
      botonSiguiente.textContent = value;
      botonSiguiente.classList.add(
        "siguiente",
        "bg-yellow-400",
        "px-4",
        "py-1",
        "mr-2",
        "mb-4",
        "font-bold",
        "uppercase",
        "rounded"
      );
      paginacionDiv.appendChild(botonSiguiente);
    }
  }
  //generador para paginacion
  *crearPaginacion(cantidadPaginas) {
    for (let i = 1; i <= cantidadPaginas; i++) {
      yield i;
    }
  }

  limpiarSelector(selector) {
    while (selector.firstChild) {
      selector.removeChild(selector.firstChild);
    }
  }
}
