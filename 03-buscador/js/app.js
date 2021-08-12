//div en el que se muestran los resultados resultado
const resultado = document.querySelector('#resultado');

//obtener todos los select/option
const selects = document.querySelectorAll('select');

//Calculos de fechas para select año
const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

//Objeto al que se cargan los filtros de busqueda
const datosBusqueda = {};



document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos(autos);  


  //carga el select de años
  llenarSelect();
});

// Listeners para select
document.addEventListener('change', (e) => {
  
  const valor = e.target.value;
  const objetivo = e.target.id;
  
  //carga al objeto llos filtros en funcion llave/valor
  datosBusqueda[objetivo] = valor;

  
  filtrarAuto();
});


// mostrar autos que existen en db.js
function mostrarAutos(autos){
  
  limpiarHTML();

  autos.forEach( auto => {
    const autoHTML = document.createElement('p');

    const { marca, modelo, year, puertas, color, transmision, precio  } = auto;
    
    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} pruertas - color: ${color} - transmision: ${transmision} - precio: $${precio}
    `;

    resultado.appendChild(autoHTML);
  });
}

//Borrar la lista en div resultado
function limpiarHTML(){
  while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild);
  }
}

// llena el select/option de año
function llenarSelect(){

  for(let i = maxYear; i >= minYear; i-- ){
    const opcion = document.createElement('option');

    opcion.value = i;
    opcion.textContent = i;

    year.appendChild(opcion);
  }
}

//Funcion de filtrado general
function filtrarAuto(){
  const resultado = autos.filter(filtrarMarca)
			  .filter(filtrarYear)
			  .filter(filtrarMinimo)
			  .filter(filtrarMaximo)
			  .filter(filtrarPuertas)
			  .filter(filtrarTransmision)
			  .filter(filtrarColor);


  if(resultado.length){
     mostrarAutos(resultado);

  }else{
    noResultado();
  }
}

//carga mensaje en caso de no haber registros que cumplan las condiciones
function noResultado(){
  limpiarHTML();
  const noResultado = document.createElement('div');
  noResultado.classList.add('alerta','error');
  noResultado.textContent = 'No hay resultados';

  resultado.appendChild(noResultado);
}


//filtros especificos para cada select
function filtrarMarca(auto){
 
  const { marca } = datosBusqueda;
  if(marca){
    return auto.marca === marca;
  }

  return auto;

}

function filtrarYear(auto){
 
  const { year } = datosBusqueda;
  if(year){
    return auto.year === parseInt(year);
  }

  return auto;

}

function filtrarMinimo(auto){
 
  const { minimo } = datosBusqueda;
  if(minimo){
    return auto.precio >= parseInt(minimo);
  }

  return auto;
  
}

function filtrarMaximo(auto){
 
  const { maximo } = datosBusqueda;
  if(maximo){
    return auto.precio <= parseInt(maximo);
  }

  return auto;

}

function filtrarPuertas(auto){
 
  const { puertas } = datosBusqueda;
  if(puertas){
    return auto.puertas === parseInt(puertas);
  }

  return auto;

}

function filtrarTransmision(auto){
 
  const { transmision } = datosBusqueda;
  if(transmision){
    return auto.transmision === transmision;
  }

  return auto;

}

function filtrarColor(auto){
 
  const { color } = datosBusqueda;
  if(color){
    return auto.color === color;
  }

  return auto;

}
