class UI{
  insertarPresupuesto(cantidad){
    const { presupuesto, restante } = cantidad;
    document.querySelector( '#total' ).textContent = presupuesto;
    document.querySelector( '#restante' ).textContent = restante;
  }

  imprimirAlerta(mensaje,tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert');

    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }

    //
    divMensaje.textContent = mensaje;

    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    setTimeout(()=>{
      divMensaje.remove();
    },3000)
  }

  agregarGastoListado(gastos){
    this.limpiarHTML();//eliminar html previo
    //iterar en los gasto
    gastos.forEach(gasto =>{
    
      const {cantidad, nombre, id} = gasto;
      
      //crear LI
      const nuevoGasto = document.createElement('li');
      nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
      
      //lo mismo que setattribute data-id
      nuevoGasto.dataset.id = id;


      //agregar HTML de gasto
      nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;
      
      //boton borrar gasto
      const btnBorrar = document.createElement('button');
      btnBorrar.classList.add('btn','btn-danger','borrar-gasto');
      btnBorrar.innerHTML = 'Borrar &times';
      btnBorrar.onclick = ()=>{
	eliminarGasto(id);
      }

      nuevoGasto.appendChild(btnBorrar);
      //agregar a HTML
      gastoListado.appendChild(nuevoGasto);
    })
  }

  limpiarHTML(){
    while(gastoListado.firstChild){
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }

  actualizarRestante(restante){
    document.querySelector( '#restante' ).textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj){

    const { presupuesto, restante } = presupuestoObj;
    const restanteDiv = document.querySelector('.restante');
    

    //comprobar 25%
    if( (presupuesto / 4) > restante ){
      restanteDiv.classList.remove('alert-success','alert-warning');
      restanteDiv.classList.add('alert-danger');
    }else if( (presupuesto / 2) > restante  ){
      restanteDiv.classList.remove('alert-success');
      restanteDiv.classList.add('alert-warning');
    }else{
      restanteDiv.classList.remove('alert-danger','alert-warning');
      restanteDiv.classList.add('alert-success');
    }

    //si el total es 0 o menor
    if(restante <= 0){
      ui.imprimirAlerta('El presupuesto se ha agotado', 'error');

      formulario.querySelector('button[type="submit"]').disabled = true;
    }
  }
}

