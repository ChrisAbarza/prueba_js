class UI{
  imprimirAlerta(mensaje,tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center','alert','d-block','col-12');

    //agregar clase en base a tipo de error

    if(tipo === 'error'){
      divMensaje.classList.add('alert-danger');
    }else{
      divMensaje.classList.add('alert-success');
    }

    //mensaje de error
    divMensaje.textContent = mensaje;

    //agregar al DOM
    document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

    //quitar alerta despues de 3s
    setTimeout(()=>{
      divMensaje.remove();
    },3000);
  }
  
  //destructuring desde funcion
  imprimirCitas({citas}){
    this.limpiarHTML();
    citas.forEach(cita =>{
      const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;
      const divCita = document.createElement('div');
      divCita.classList.add('cita','p-3');
      divCita.dataset.id = id;

      //scripting de los elementos de la cita
      const mascotaParrafo = document.createElement('h2');
      mascotaParrafo.classList.add('card-title','font-weight-bolder');
      mascotaParrafo.textContent = mascota;

      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = `
	<span class="font-weight-bolder">Propietario:</span> ${propietario}
      `;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
	<span class="font-weight-bolder">Teléfono:</span> ${telefono}
      `;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
	<span class="font-weight-bolder">Fecha:</span> ${fecha}
      `;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
	<span class="font-weight-bolder">Hora:</span> ${hora}
      `;

      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `
	<span class="font-weight-bolder">sintomas:</span> ${sintomas}
      `;

      //boton para eliminar cita
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn','btn-danger','mr-2');
      btnEliminar.innerHTML = 'Eliminar &times';
      btnEliminar.onclick = () => eliminarCita(id);

      //boton para editar cita
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn','btn-info');
      btnEditar.innerHTML = 'Editar';
      btnEditar.onclick = () => cargarEditarCita(cita);

      divCita.appendChild(mascotaParrafo);
      divCita.appendChild(propietarioParrafo);
      divCita.appendChild(telefonoParrafo);
      divCita.appendChild(fechaParrafo);
      divCita.appendChild(horaParrafo);
      divCita.appendChild(sintomasParrafo);
      divCita.appendChild(btnEliminar);
      divCita.appendChild(btnEditar);


      contenedorCitas.appendChild(divCita); 
    });
    
  }

  limpiarHTML(){
    while(contenedorCitas.firstChild){
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
  }
}
