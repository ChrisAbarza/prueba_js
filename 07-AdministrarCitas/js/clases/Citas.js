class Citas{
  constructor(){
    this.citas = [];
  }

  agregarCita(cita){
    this.citas = [...this.citas,cita];
  }

  eliminarCita(id){
    this.citas = this.citas.filter( cita => cita.id !== id );
  }

  editarCita(citaActualizada){
    //iterar en cada una de las citas, busca la id de la cita actualizada, de ser asi se reescribe todo el obj de la cita, si no mantiene la cita antigua
    this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
  }

}

export default Citas;