//Constructores

function Seguro(marca,year,tipo){
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

//realiza la cotizacion
Seguro.prototype.cotizarSeguro = function() {
  /*
   *	1 = americano = 1.15
   *	2 = asiatico = 1.05
   *	3 = europeo = 1.35
   */

  let cantidad;
  const base = 2000;


  switch(this.marca){
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;

    default:
      break;
  }
  
  //Leer diferencia en años
  const diferencia = new Date().getFullYear() - this.year;

  // a mas años de diferencia, el costo se reduce un 3% / año
  
  cantidad -= ( ( diferencia * 3 ) * cantidad ) / 100;

  /*
   *	si el seguro es básico multiplicar por 30% más
   *	si el seguro es completo multiplicar por 50% más
   *
   */

  if(this.tipo === 'basico'){
    cantidad *= 1.30;
  }else{
    cantidad *= 1.50;
  }

  return cantidad;

}

function UI(){}

//Lenar las opciones de los años
UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
	min = max - 20;

  const selectYear = document.querySelector('#year');

  for(let i = max;i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;

    selectYear.appendChild(option);
  }
}

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  
  const div = document.createElement('div');

  tipo === 'error' ? div.classList.add('error') : div.classList.add('correcto');

  div.classList.add('mensaje','mt-10');
  div.textContent = mensaje;

  //insertar en html
  const formulario = document.querySelector('#cotizar-seguro');

  formulario.insertBefore(div, document.querySelector('#resultado'));

  setTimeout(()=>{
    div.remove();
  },3000);

}

UI.prototype.mostrarResultado = (seguro,total) =>{

  const { year, tipo  } = seguro;
  
  //obtener el texto del value del select #marca
  const selectMarca = document.querySelector('#marca');
  const textoMarca = selectMarca.options[selectMarca.selectedIndex].text;
  
  const div = document.createElement('div');

  div.classList.add('mt-10');

  div.innerHTML = `
      <p class="header">Tu Resumen</p>
      <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca}</span></p>
      <p class="font-bold">Año: <span class="font-normal"> ${year}</span></p>
      <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo}</span></p>
      <p class="font-bold">Total: <span class="font-normal"> $${total}</span></p>

  `;

  const resultadoDiv = document.querySelector('#resultado');


  //mostrar spinner cargando...
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(()=>{
    spinner.style.display = 'none';
    resultadoDiv.appendChild(div); 
  },3000)
}

// Instanciar UI
const ui = new UI();




document.addEventListener('DOMContentLoaded', () =>{
  // llenar el select #year
  ui.llenarOpciones();

});

eventListeners();
function eventListeners(){
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro);

}


function cotizarSeguro(e){
  e.preventDefault();

  const marca = document.querySelector('#marca').value;

  const year = document.querySelector('#year').value;

  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if(marca === '' || year === '' || tipo === ''){
    ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
    return;
  }

  // ocultar cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if(resultados != null ){
    resultados.remove();
  }
  
  //instanciar seguro
  const seguro = new Seguro(marca, year, tipo);
  
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(seguro, total);
}
