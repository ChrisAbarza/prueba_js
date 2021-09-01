import { crearDB } from '../funciones.js';
class App{
  constructor(){
    this.initApp();
  }
  initApp(){
    document.addEventListener('DOMContentLoaded', ()=>{
      crearDB();
    })
  }
}

export default App; 
