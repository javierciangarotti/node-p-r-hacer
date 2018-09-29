const fs = require('fs');


let listadoPorHacer = [];

const guardar = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
      if( err ) throw new Error('Problemas al Grabar ', err);
    });
}

const cargarDB = () =>{

  try {
    listadoPorHacer = require('../db/data.json');
  } catch (e) {
    listadoPorHacer = [];
  }


}

const crear = (descripcion) => {

  cargarDB();

  let porHacer = {
    descripcion,
    completado: false
  }

  listadoPorHacer.push(porHacer);

  guardar();

  return porHacer;

}

const getListado = (completado) => {
  cargarDB();
  let nuevaLista = [];


  if (completado == undefined) nuevaLista = listadoPorHacer;
  else {nuevaLista = listadoPorHacer.filter(tarea => tarea.completado === completado);
    console.log(Boolean(completado));
  }


  return nuevaLista;


}

const actualizar = (descripcion, completado = true) => {

  cargarDB();
  let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion)

  if (index >= 0){
    listadoPorHacer[index].completado = completado;
    guardar();
    return true;
  }else{
    return false;
  }

}

const borrar = (descripcion) => {

  cargarDB();
  let cantidadAntigua = listadoPorHacer.length;
  let nuevaLista = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

  let cantidadNueva = nuevaLista.length;

  if(cantidadAntigua > cantidadNueva) {
    listadoPorHacer = nuevaLista;
    guardar();
    return true;
  }
  else return false;

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}
