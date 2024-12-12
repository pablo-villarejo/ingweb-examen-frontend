const express = require('express')
const router = express.Router()

const tareaController = require('../controllers/tareaController')

router.get('/', tareaController.getAllTareas);
router.post('/', tareaController.createTarea);

router.get('/completamente-asignadas', tareaController.getTareasCompletamenteAsignadas);
router.get('/habilidad/:habilidad', tareaController.getTareasPorHabilidad); // Tareas que requieren una determinada habilidad
router.get('/colaborador/:colaborador', tareaController.getTareasPorColaborador); // Obtener tareas asignadas a un colaborador

router.get('/:responsable/colaboradores', tareaController.buscarColaboradoresDeUsuario);


router.put('/:id/colaboradores', tareaController.asignarColaboradorATarea); // Asignar colaborador a una tarea
router.get('/:id/candidatos', tareaController.buscarCandidatos);


router.get('/:id', tareaController.getTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);







module.exports = router