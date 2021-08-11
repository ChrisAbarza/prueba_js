//variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const btnReset = document.querySelector('#resetBtn');
// variables de formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(){
  // se lanza al cargar el DOM
  document.addEventListener('DOMContentLoaded', iniciarApp);
  
  //campos de formulario

  email.addEventListener('blur', validarFormulario);
  asunto.addEventListener('blur', validarFormulario);
  mensaje.addEventListener('blur', validarFormulario);

  btnEnviar.addEventListener('click', enviarEmail);

  btnReset.addEventListener('click', resetearForm);
}


//funciones

function iniciarApp(){
  btnEnviar.disabled = true;
  btnEnviar.classList.add('cursor-not-allowed','opacity-50');
}

// funcion que valida el formulario
function validarFormulario(e){
  
  if(e.target.value.length > 0){
    //eliminar cuadro de errores
    const error = document.querySelector('p.error');
    if(error){
      error.remove();

    }

    e.target.classList.remove('border','border-red-500');
    e.target.classList.add('border','border-green-500');
      
  }else{
    e.target.classList.remove('border','border-green-500');
    e.target.classList.add('border','border-red-500');

    mostrarError('Todos los campos son necesarios');
  } 

  if(e.target.type === 'email'){
    
    //email en formato valido
    if(er.test(e.target.value) ){
       //eliminar cuadro de errores
      const error = document.querySelector('p.error');

      if(error){
	error.remove();

      }

      e.target.classList.remove('border','border-red-500');
      e.target.classList.add('border','border-green-500');
    }
    else{
      e.target.classList.remove('border','border-green-500');
      e.target.classList.add('border','border-red-500'); 
      mostrarError('El Email no tiene el formato correcto');
    }
 
  }
  if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
     btnEnviar.disabled = false;
     btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    
  }
}

function mostrarError(mensaje){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = mensaje;
  mensajeError.classList.add('border','border-red-500','background-red-100','text-red-500','p-3','mt-5','text-center','error');

  const errores = document.querySelectorAll('.error');

  if(errores.length === 0){
    formulario.appendChild(mensajeError);
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');
  }

}

function enviarEmail(e){
  e.preventDefault();

  const spinner = document.querySelector('#spinner');
  spinner.style.display = 'flex';


  //ocultar despues de 3 seg
  //
  setTimeout( () => {
    spinner.style.display = 'none';

    const parrafo = document.createElement('p');
    parrafo.textContent = 'Mensaje enviado correctamente';
    parrafo.classList.add('text-center','my-10','p-2','bg-green-500','text-white','font-bold','uppercase')
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() =>{
      parrafo.remove();
      resetearForm();
    },5000)

  },3000 );
}


function resetearForm(){
  formulario.reset();
  email.classList.remove('border','border-green-500','border-red-500');
  asunto.classList.remove('border','border-green-500','border-red-500');
  mensaje.classList.remove('border','border-green-500','border-red-500');
  
  iniciarApp();
  
}
