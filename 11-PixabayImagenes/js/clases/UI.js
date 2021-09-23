import { formulario, resultado } from "../selectores.js";

export default class UI {
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

  mostrarImagenes(imagenes) {
    this.limpiarDivResultados();

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
  }

  limpiarDivResultados() {
    while (resultado.firstChild) {
      resultado.removeChild(resultado.firstChild);
    }
  }
}
