//variables
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

let presupuestoUsuario;


//eventos

eventListeners();
function eventListeners(){
  document.addEventListener('DOMContentLoaded', preguntarPresupuesto);

  formulario.addEventListener('submit', agregarGasto);
}


// clases
class Presupuesto{
  constructor(presupuesto){
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto){
    this.gastos = [...this.gastos,gasto];
    this.calcularRestante();
  }

  calcularRestante(){
    const gastado = this.gastos.reduce( ( total , gasto ) => total + gasto.cantidad, 0 );
    this.restante = this.presupuesto - gastado;
  }

}

class UI{
  insertarPresupuesto(cantidad){
    const { presupuesto, restante } = cantidad;
    document.querySelector( '#total' ).textContent = presupuesto;
    document.querySelector( '#restante' ).textContent = restante;
  }

  imprimirAlerta(mensaje,tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert');

    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }

    //
    divMensaje.textContent = mensaje;

    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(()=>{
      divMensaje.remove();
    },3000)
  }

  agregarGastoListado(gastos){
    this.limpiarHTML();//eliminar html previo
    //iterar en los gasto
    gastos.forEach(gasto =>{
    
      const {cantidad, nombre, id} = gasto;
      
      //crear LI
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      //lo mismo que setattribute data-id
      nuevoGasto.dataset.id = id;


      //agregar HTML de gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;
      
      //boton borrar gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times';

      nuevoGasto.appendChild(btnBorrar);
      //agregar a HTML
      gastoListado.appendChild(nuevoGasto);
    })
  }

  limpiarHTML(){
    while(gastoListado.firstChild){
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante){
    document.querySelector( '#restante' ).textContent = restante;
  }
}

const ui = new UI();

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
  ui.agregarGastoListado(gastos);
  ui.actualizarRestante(restante);

  formulario.reset();


}
