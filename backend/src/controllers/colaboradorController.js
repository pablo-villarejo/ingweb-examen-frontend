const Colaborador = require('../models/colaboradorModel');

// Obtener todos los colaboradores
const getAllColaboradores = async (req, res) => {
    try {
        const colaboradores = await Colaborador.find();
        res.status(200).json(colaboradores);
    } catch (error) {
        console.error('Error al obtener los colaboradores:', error);
        res.status(500).json({ message: 'Error al obtener los colaboradores' });
    }
};

// Obtener un colaborador por su email
const getColaborador = async (req, res) => {
    const { email } = req.params;
    try {
        const colaborador = await Colaborador.findOne({ email });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        res.status(200).json(colaborador);
    } catch (error) {
        console.error('Error al obtener el colaborador:', error);
        res.status(500).json({ message: 'Error al obtener el colaborador' });
    }
};

// Crear un nuevo colaborador
const createColaborador = async (req, res) => {
    const { email, nombre, habilidades } = req.body;
    try {
        // Verificar si ya existe un colaborador con el mismo email
        const colaboradorExistente = await Colaborador.findOne({ email });
        if (colaboradorExistente) {
            return res.status(400).json({ message: 'El colaborador ya existe con este email' });
        }

        const nuevoColaborador = new Colaborador({ email, nombre, habilidades });
        const colaboradorGuardado = await nuevoColaborador.save();
        res.status(201).json(colaboradorGuardado);
    } catch (error) {
        console.error('Error al crear el colaborador:', error);
        res.status(500).json({ message: 'Error al crear el colaborador' });
    }
};

// Eliminar un colaborador por su email
const deleteColaborador = async (req, res) => {
    const { email } = req.params;
    try {
        const colaboradorEliminado = await Colaborador.findOneAndDelete({ email });
        if (!colaboradorEliminado) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        res.status(200).json({ message: 'Colaborador eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el colaborador:', error);
        res.status(500).json({ message: 'Error al eliminar el colaborador' });
    }
};

// Obtener las habilidades de un colaborador
const getHabilidades = async (req, res) => {
    const { email } = req.params;
    try {
        const colaborador = await Colaborador.findOne({ email });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        res.status(200).json(colaborador.habilidades);
    } catch (error) {
        console.error('Error al obtener las habilidades:', error);
        res.status(500).json({ message: 'Error al obtener las habilidades del colaborador' });
    }
};

// Añadir una habilidad a un colaborador
const addHabilidad = async (req, res) => {
    const { email } = req.params;
    const { habilidad } = req.body;
    try {
        const colaborador = await Colaborador.findOne({ email });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        if (colaborador.habilidades.includes(habilidad)) {
            return res.status(400).json({ message: 'La habilidad ya existe en el colaborador' });
        }
        colaborador.habilidades.push(habilidad);
        await colaborador.save();
        res.status(201).json({ message: 'Habilidad añadida correctamente', habilidades: colaborador.habilidades });
    } catch (error) {
        console.error('Error al añadir la habilidad:', error);
        res.status(500).json({ message: 'Error al añadir la habilidad al colaborador' });
    }
};


// Eliminar una habilidad de un colaborador
const deleteHabilidad = async (req, res) => {
    const { email } = req.params;
    const { habilidad } = req.body;
    try {
        const colaborador = await Colaborador.findOne({ email });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }
        if (!colaborador.habilidades.includes(habilidad)) {
            return res.status(400).json({ message: 'La habilidad no existe en el colaborador' });
        }
        colaborador.habilidades = colaborador.habilidades.filter(h => h !== habilidad);
        await colaborador.save();
        res.status(200).json({ message: 'Habilidad eliminada correctamente', habilidades: colaborador.habilidades });
    } catch (error) {
        console.error('Error al eliminar la habilidad:', error);
        res.status(500).json({ message: 'Error al eliminar la habilidad del colaborador' });
    }
};

module.exports = {
    getAllColaboradores,
    getColaborador,
    createColaborador,
    deleteColaborador,
    getHabilidades,
    addHabilidad,
    deleteHabilidad
};
