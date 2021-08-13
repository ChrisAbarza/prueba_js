const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');

let tweets = [];

eventListeners();



function eventListeners(){
  
  document.addEventListener('DOMContentLoaded', () => {
    tweets = JSON.parse(localStorage.getItem('tweets')) || [] ;

    crearHTML();
  } );

  formulario.addEventListener('submit', agregarTweet);

}

//agrega tweet al arreglo al presionar btn agregar
function agregarTweet(e){
  e.preventDefault();

  //textarea del tweet
  //
  const tweet = document.querySelector('#tweet').value;

  if(tweet === ''){
    mostrarError('Un mensaje no puede ser vacio');
    return;
  }

  const tweetObj = {
    tweet,
    id : Date.now()
  };

  //añadir a arreglo

  tweets = [...tweets,tweetObj] ;

  crearHTML();

  formulario.reset();

}

// muestra texto de error en caso que se ingrese un tweet en blanco
function mostrarError(error){
  const mensajeError = document.createElement('p');
  mensajeError.textContent = error;
  mensajeError.classList.add('error');

  const contenido = document.querySelector('#contenido');

  contenido.appendChild(mensajeError);
  
  //eliminar mensaje despues de 3s
  setTimeout(() => {
    mensajeError.remove();
  },3000);
}

function crearHTML(){
  limpiarHTML();

  if(tweets.length > 0){
    tweets.forEach( tweet => {
      
      const btnEliminar = document.createElement('a');
      btnEliminar.classList.add('borrar-tweet');
      btnEliminar.textContent = 'X';
      
      //agregar funcion eliminar a cada btnEliminar
      btnEliminar.onclick = () =>{
	borrarTweet(tweet.id);
      };

      const li = document.createElement('li');
      li.innerHTML = tweet.tweet;
      li.appendChild(btnEliminar);


      listaTweets.appendChild(li);
    } );

  }
  
  //se sincronizan los elementos dentro del localstorage
  sincronizarStorage();

}


//agregar tweets a localstorage
function sincronizarStorage(){

  //ls no soporta obj, por lo que se convierte el objeto a JSON para almacenar
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
  
  //forma limpia de eliminar los child de un elemento
  while(listaTweets.firstChild){
    listaTweets.removeChild(listaTweets.firstChild);
  }
  
}

//se lanza al hacer click en la "X" al lado de cada tweet
function borrarTweet(id){
  
  //se utiliza filter sobre el array de obj, trayendo TODOS menos el id seleccionado
  tweets = tweets.filter(tweet => tweet.id !== id );

  crearHTML();
}
