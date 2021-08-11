const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
  mostrarAutos();  
});



// mostrar autos que existen en db.js
function mostrarAutos(){
  autos.forEach( auto => {
    const autoHTML = document.createElement('p');

    const { marca, modelo, year, puertas, color, transmision, precio  } = auto;
    
    autoHTML.textContent = `
      ${marca} ${modelo} - ${year} - ${puertas} pruertas - color: ${color} - transmision: ${transmision} - precio: $${precio}
    `
    resultado.appendChild(autoHTML);
  });
}
