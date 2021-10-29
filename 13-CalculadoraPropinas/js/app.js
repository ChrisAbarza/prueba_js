import { btnCrearOrden, inputMesa, inputHora } from "./selectores.js";
import UI from "./clases/UI.js";
import ComidaAPI from "./clases/ComidaAPI.js";
// objeto de cliente
let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};
const ui = new UI();
const comidaAPI = new ComidaAPI();
btnCrearOrden.addEventListener("click", guardarCliente);

function guardarCliente() {
  const mesa = inputMesa.value;
  const hora = inputHora.value;

  //validar campos vacios mediante array some
  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    ui.mostrarError("Favor llenar todos los campos...");
    return;
  }

  cliente = { ...cliente, mesa, hora };

  ui.ocultarModal();
  ui.mostrarSecciones();

  //consultar platillos a la api
  (async () => {
    comidaAPI.consultarPlatillos().then((datos) => {
      console.log(datos);
    });
  })();
}
