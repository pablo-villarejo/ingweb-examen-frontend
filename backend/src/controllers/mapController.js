const Map = require('../models/mapModel');

// Obtener todos los mapas
const getAllMaps = async (req, res) => {
    try {
        const maps = await Map.find();
        res.status(200).json(maps);
    } catch (error) {
        console.error('Error al obtener los mapas:', error);
        res.status(500).json({ message: 'Error al obtener los mapas' });
    }
};

// Obtener un mapa por email
const getMapByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const map = await Map.findOne({ email });
        if (!map) {
            return res.status(404).json({ message: 'Mapa no encontrado' });
        }
        res.status(200).json(map);
    } catch (error) {
        console.error('Error al obtener el mapa:', error);
        res.status(500).json({ message: 'Error al obtener el mapa' });
    }
};

// Crear un nuevo mapa
const createMap = async (req, res) => {
    const { email, markers = [], visits = [] } = req.body;
    try {
        // Verificar si ya existe un mapa con el mismo email
        const existingMap = await Map.findOne({ email });
        if (existingMap) {
            return res.status(400).json({ message: 'El mapa ya existe para este email' });
        }

        const newMap = new Map({ email, markers, visits });
        const savedMap = await newMap.save();
        res.status(201).json(savedMap);
    } catch (error) {
        console.error('Error al crear el mapa:', error);
        res.status(500).json({ message: 'Error al crear el mapa' });
    }
};

// Eliminar un mapa por email
const deleteMapByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const deletedMap = await Map.findOneAndDelete({ email });
        if (!deletedMap) {
            return res.status(404).json({ message: 'Mapa no encontrado' });
        }
        res.status(200).json({ message: 'Mapa eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el mapa:', error);
        res.status(500).json({ message: 'Error al eliminar el mapa' });
    }
};

// Añadir un marcador a un mapa
const addMarker = async (req, res) => {
    const { email } = req.params;
    const { locationName, coordinates, imageURL } = req.body;

    try {
        const map = await Map.findOne({ email });
        if (!map) {
            return res.status(404).json({ message: 'Mapa no encontrado' });
        }

        map.markers.push({ locationName, coordinates, imageURL });
        await map.save();
        res.status(201).json({ message: 'Marcador añadido correctamente', markers: map.markers });
    } catch (error) {
        console.error('Error al añadir el marcador:', error);
        res.status(500).json({ message: 'Error al añadir el marcador al mapa' });
    }
};

module.exports = {
    getAllMaps,
    getMapByEmail,
    createMap,
    deleteMapByEmail,
    addMarker,
};
