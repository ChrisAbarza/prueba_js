//inputs
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

//formulario
const formulario = document.querySelector('#nueva-cita');

//ul listado de citas 
const contenedorCitas = document.querySelector('#citas');

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

//agrega datos al obj de cita
function datosCita(e){
  citaObj[e.target.name] = e.target.value;

}

//valida y agrega una nueva cita
function nuevaCita(e){
  e.preventDefault();

  //extraer info de obj de citas
  const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
 
  //validar vacios
  let mensajeError = '';
  Object.entries(citaObj).forEach(([key,value])=>{
    if(value === ''){
      mensajeError += `,${key}`;      
    }
  });

  if(mensajeError !== ''){

    ui.imprimirAlerta(`Faltan los campos ${mensajeError}`,'error');
    return;
  }
}
