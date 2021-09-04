import { container } from "../selectores.js";
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
    }, 3000);
  }
}
