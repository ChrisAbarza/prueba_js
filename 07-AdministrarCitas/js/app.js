//inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//formulario
const formulario = document.querySelector('#nueva-cita');
const btnGuardar = formulario.querySelector('button[type="submit"]')

//ul listado de citas 
const contenedorCitas = document.querySelector('#citas');

let modo = 'guardar';

const ui = new UI();
const administrarCitas = new Citas();

eventListeners();
function eventListeners(){
  mascotaInput.addEventListener('input', datosCita);
  propietarioInput.addEventListener('input', datosCita);
  telefonoInput.addEventListener('input', datosCita);
  fechaInput.addEventListener('input', datosCita);
  horaInput.addEventListener('input', datosCita);
  sintomasInput.addEventListener('input', datosCita);

  formulario.addEventListener('submit', nuevaCita);
}

const citaObj = {
  mascota:     '',
  propietario: '',
  telefono:    '',
  fecha:       '',
  hora:        '',
  sintomas:    ''
}

const textoModoObj = {
  guardar: 'CREAR CITA',
  editar: 'GUARDAR CAMBIOS'
}

//agrega datos al obj de cita
function datosCita(e){
  citaObj[e.target.name] = e.target.value;

}

//valida y agrega una nueva cita
function nuevaCita(e){
  e.preventDefault();

  modo === 'guardar' ? citaObj.id = Date.now() : '';
  
  //validar vacios
  let mensajeError = '';
  Object.entries(citaObj).forEach(([key,value])=>{
    if(value === ''){
      mensajeError += `${key},`;      
    }
  });

  if(mensajeError !== ''){

    ui.imprimirAlerta(`Faltan los campos ${mensajeError}`,'error');
    return;
  }

  if(modo === 'editar'){
    //mensaje agregado correctamente
    ui.imprimirAlerta('Editado correctamente', 'correcto');

    administrarCitas.editarCita({...citaObj});
  }else{    

    //crear una nueva cita solo una copia por eso el {...citaObj}
    administrarCitas.agregarCita({...citaObj});

    //mensaje agregado correctamente
    ui.imprimirAlerta('Agregado correctamente', 'correcto');
  }

  formulario.reset();
  
  reiniciarObj();

  //mostrar HTML de la cita
  ui.imprimirCitas(administrarCitas);

  //reiniciar modo
  modo = 'guardar';
  btnGuardar.textContent = textoModoObj[modo];
}

function reiniciarObj(){
  //reinicia cada valor del objeto
  Object.entries(citaObj).forEach(([key])=>{
    citaObj[key] = '';
  });
 
}

function eliminarCita(id){
  //Eliminar cita de la clase
  administrarCitas.eliminarCita(id);
  //imprimir mensaje de alerta
  ui.imprimirAlerta('Eliminada correctamente', 'correcto');
  //recargar lista de citas
  ui.imprimirCitas(administrarCitas);
}

function cargarEditarCita(cita){
  const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

  //llenar los inputs
  mascotaInput.value = mascota;
  propietarioInput.value = propietario;
  telefonoInput.value = telefono;
  fechaInput.value = fecha;
  horaInput.value = hora;
  sintomasInput.value = sintomas;

  //llena el objeto
  citaObj.mascota = mascota;
  citaObj.propietario = propietario;
  citaObj.telefono = telefono;
  citaObj.fecha = fecha;
  citaObj.hora = hora;
  citaObj.sintomas = sintomas;
  citaObj.id = id;

  //cambiar texto de boton crearCita
  modo = 'editar';
  btnGuardar.textContent = textoModoObj[modo];
}
