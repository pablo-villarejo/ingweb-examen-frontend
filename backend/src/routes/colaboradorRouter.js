const express = require('express')
const router = express.Router()

const colaboradorController = require('../controllers/colaboradorController')

router.get('/', colaboradorController.getAllColaboradores)
router.post('/', colaboradorController.createColaborador)

router.get('/:email/habilidades', colaboradorController.getHabilidades);
router.post('/:email/habilidades', colaboradorController.addHabilidad);
router.delete('/:email/habilidades', colaboradorController.deleteHabilidad);

router.get('/:email', colaboradorController.getColaborador)
router.delete('/:email', colaboradorController.deleteColaborador)

module.exports = router