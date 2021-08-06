// variables

const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const containerCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carritoCompra = [];

cargarEventListener();
function cargarEventListener(){
    // agregando curso con btn 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarDelCarrito);
    btnVaciarCarrito.addEventListener('click',() => {
        carritoCompra = [];
        limpiarHTML();
    })
}

function agregarCurso(e){
    e.preventDefault();

    //Prevenir bubbling mediante clase
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarDelCarrito(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // en caso de tener mas de una copia de un mismo elemento, se borra de a uno
        carritoCompra.map(curso => {
            if(curso.id === cursoId){
                curso.cantidad--;
                return curso;
            }
            return curso;
        });

        carritoCompra = carritoCompra.filter(curso => curso.id !== cursoId || curso.cantidad > 0);
        carritoHTML();
    }
}


function leerDatosCurso(curso){
    
    const infoCurso = {
        img:            curso.querySelector('img').src,
        nombreCurso:    curso.querySelector('h4').textContent,
        precio:         curso.querySelector('.precio span').textContent,
        id:             curso.querySelector('a').getAttribute('data-id'),
        cantidad:       1
    };

    // revisa si el curso ya existe en el carrito
    const existe = carritoCompra.some( curso => curso.id === infoCurso.id);
    if(existe){
        // agrega una cantidad
        const cursos = carritoCompra.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }
            return curso;
        });
        carritoCompra = [...cursos];
    }else{
        // agregar el elemento
        carritoCompra = [...carritoCompra,infoCurso];

    }
    
    // agregando al arreglo carrito

    carritoHTML();
}

// muestra carrito en html
function carritoHTML(){
    // limpiar html
    limpiarHTML();
    
    // recorre html
    carritoCompra.forEach( curso => {
        // destructuring. extrae de obj y crea la variable
        const {img, nombreCurso, precio, cantidad, id} = curso;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${img}" width=100></td>
            <td>${nombreCurso}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </td>
        `;
        // agregando html a tbody
        containerCarrito.appendChild(row);
    });
}

function limpiarHTML() {
    containerCarrito.innerHTML = '';
}
