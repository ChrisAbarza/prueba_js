export default class DBIndexed{
  constructor(){
    this.crearBD();
  }
  crearBD(){
    //crear bd nombre crm en version 1.0
    const crearDB = window.indexedDB.open('crm',1);

    crearDB.onerror = function(){
      console.log('error al crear indexedDB');
    }

    crearDB.onsuccess = function(){
      this.DB = crearDB.result;
    }

    crearDB.onupgradeneeded = function(e){
      const db = e.target.result;

      const objectStore = db.createObjectStore('crm',{keyPath:'id', autoIncrement:true});

      objectStore.createIndex('nombre','nombre', {unique:false});
      objectStore.createIndex('email','email', {unique:true});
      objectStore.createIndex('telefono','telefono', {unique:false});
      objectStore.createIndex('empresa','empresa', {unique:false});
      objectStore.createIndex('id','id', {unique:true});

    }
  }
}
