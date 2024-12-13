const express = require('express');
const {
    getAllMaps,
    getMapByEmail,
    createMap,
    deleteMapByEmail,
    addMarker,
} = require('../controllers/mapController');

const router = express.Router();

// Rutas para el modelo Map
router.get('/', getAllMaps); // Obtener todos los mapas
router.get('/:email', getMapByEmail); // Obtener un mapa por email
router.post('/', createMap); // Crear un nuevo mapa
router.delete('/:email', deleteMapByEmail); // Eliminar un mapa por email
router.post('/:email/markers', addMarker); // Añadir un marcador a un mapa

module.exports = router;
