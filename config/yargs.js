const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Descripción de la tarea por hacer'
};

const completado = {
  alias: 'c',
  default: true,
  type: 'boolean'
};

const filtrocompletado = {
  alias: 'c',
  type: 'boolean'
}

const argv = require('yargs')
  .command('crear', 'Crear un elemento por hacer',{
    descripcion
  })
  .command('actualizar', 'Actualiza el estado de una tarea',{
    descripcion,
    completado
  })
  .command('borrar', 'Borrar una tarea',{
    descripcion
  })
  .command('listar', 'Listar una tarea', {
    completado: filtrocompletado
  })
  .help()
  .argv;

module.exports = {
  argv
}
