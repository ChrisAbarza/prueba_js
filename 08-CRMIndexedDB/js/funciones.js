import DBIndexed from "./clases/DBIndexed.js";

export let DB;

//crea la bd IndexeDB
export function crearDB(){
  DB = new DBIndexed(); 
  
}
