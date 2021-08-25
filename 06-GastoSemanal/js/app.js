//variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

let presupuestoUsuario;

//instanciar ui
const ui = new UI();
//eventos

eventListeners();
function eventListeners(){
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

  formulario.addEventListener('submit', agregarGasto);
}




// funciones
function preguntarPresupuesto(){
  const presupuesto = prompt('Ingresar presupuesto semanal:');

  if(presupuesto === '' || presupuesto === null || isNaN(presupuesto) || presupuesto <= 0 ){
    window.location.reload();
  }

  //crear presupuesto valido
  presupuestoUsuario = new Presupuesto(presupuesto);

  ui.insertarPresupuesto(presupuestoUsuario);

}

function agregarGasto(e){
  e.preventDefault();

  //leer datos de form
  //
  const nombre = document.querySelector('#gasto').value;
  const cantidad = Number(document.querySelector('#cantidad').value);
 
  if(nombre === '' || cantidad === ''){
    ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
    return;
  }else if(cantidad <= 0 || isNaN(cantidad) ){
    ui.imprimirAlerta('Cantidad no válida', 'error');
    return;
  }

  // Generar un obj con gasto (object literal enhancement)
  const gasto = { nombre, cantidad, id: Date.now() };

  presupuestoUsuario.nuevoGasto(gasto);

  ui.imprimirAlerta('Agregado correctamente', 'correcto');
  
  
  const { gastos, restante } = presupuestoUsuario;
  
  //imprimir gasto en el listado
  ui.agregarGastoListado(gastos);
  
  //actualizar valor restante
  ui.actualizarRestante(restante);


  //cambiar de color el restante
  ui.comprobarPresupuesto(presupuestoUsuario);

  formulario.reset();


}

function eliminarGasto(gastoId){
  //elimina gasto del obj
  presupuestoUsuario.eliminarGasto(gastoId);

  //elimina gasto del html  
  const { gastos, restante } = presupuestoUsuario;
  ui.agregarGastoListado(gastos);

  //actualizar valor restante
  ui.actualizarRestante(restante);

  //cambiar de color el restante
  ui.comprobarPresupuesto(presupuestoUsuario);
}
