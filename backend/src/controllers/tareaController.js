const Tarea = require('../models/tareaModel');

const getAllTareas = async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas' });
    }
};

const getTarea = async (req, res) => {
    const { id } = req.params;
    const [responsable, descripcion] = id.split('___');
    try {
        const tarea = await Tarea.findOne({ responsable, descripcion });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la tarea' });
    }
};

const createTarea = async (req, res) => {
    const { responsable, descripcion, habilidades, segmentos, colaboradores = [] } = req.body; // Si no se pasan colaboradores, se usa un array vacío
    try {
        const tareaExistente = await Tarea.findOne({ responsable, descripcion });
        if (tareaExistente) {
            return res.status(400).json({ message: 'La tarea ya existe para este responsable y descripción' });
        }

        const nuevaTarea = new Tarea({ responsable, descripcion, habilidades, segmentos, colaboradores });
        const tareaGuardada = await nuevaTarea.save();
        res.status(201).json(tareaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea' });
    }
};

const updateTarea = async (req, res) => {
    const { id } = req.params;
    const [responsable, descripcion] = id.split('___');
    const { habilidades, segmentos, colaboradores } = req.body; // colaboradores puede ser un array vacío o el valor actual
    try {
        const tareaActualizada = await Tarea.findOneAndUpdate(
            { responsable, descripcion },
            { habilidades, segmentos, colaboradores },  // Solo se actualizan los campos proporcionados
            { new: true }
        );
        if (!tareaActualizada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea' });
    }
};


const deleteTarea = async (req, res) => {
    const { id } = req.params;
    const [responsable, descripcion] = id.split('___');
    try {
        const tareaEliminada = await Tarea.findOneAndDelete({ responsable, descripcion });
        if (!tareaEliminada) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea' });
    }
};

const getTareasPorHabilidad = async (req, res) => {
    const { habilidad } = req.params;
    try {
        const tareas = await Tarea.find({ habilidades: { $in: [habilidad] } });
        if (tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas que requieran esta habilidad' });
        }
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener las tareas por habilidad:', error);
        res.status(500).json({ message: 'Error al obtener las tareas por habilidad' });
    }
};

const getTareasPorColaborador = async (req, res) => {
    const { colaborador } = req.params;
    try {
        const tareas = await Tarea.find({ colaboradores: colaborador });  // Busca tareas donde 'colaborador' está en la lista de colaboradores
        if (tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas asignadas a este colaborador' });
        }
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener las tareas por colaborador:', error);
        res.status(500).json({ message: 'Error al obtener las tareas asignadas al colaborador' });
    }
};

const asignarColaboradorATarea = async (req, res) => {
    const { id } = req.params;
    const [responsable, descripcion] = id.split('___');
    const { colaboradorEmail } = req.body;

    try {
        const tarea = await Tarea.findOne({ responsable, descripcion });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // Buscar el colaborador por su email
        const colaborador = await Colaborador.findOne({ email: colaboradorEmail });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador no encontrado' });
        }

        // Verificar si el colaborador tiene alguna de las habilidades requeridas
        const tieneHabilidad = tarea.habilidades.some(habilidad => colaborador.habilidades.includes(habilidad));
        if (!tieneHabilidad) {
            return res.status(400).json({ message: 'El colaborador no posee las habilidades requeridas para esta tarea' });
        }

        // Añadir el colaborador a la lista de colaboradores si no está ya asignado
        if (!tarea.colaboradores.includes(colaboradorEmail)) {
            tarea.colaboradores.push(colaboradorEmail);
            const tareaActualizada = await tarea.save();
            return res.status(200).json(tareaActualizada);
        } else {
            return res.status(400).json({ message: 'El colaborador ya está asignado a esta tarea' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al asignar el colaborador a la tarea' });
    }
};


const buscarCandidatos = async (req, res) => {
    const { id } = req.params;
    const [responsable, descripcion] = id.split('___');
    try {
        const tarea = await Tarea.findOne({ responsable, descripcion });
        if (!tarea) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        const candidatos = await Colaborador.find({
            habilidades: { $in: tarea.habilidades }
        }).select('email');

        if (candidatos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron candidatos para la tarea' });
        }

        const emails = candidatos.map(candidato => candidato.email);
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar candidatos' });
    }
};

const getTareasCompletamenteAsignadas = async (req, res) => {
    try {
        const tareas = await Tarea.find({
            $expr: { $eq: [{ $size: "$colaboradores" }, "$segmentos"] }
        });

        if (tareas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron tareas completamente asignadas' });
        }

        res.status(200).json(tareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tareas completamente asignadas' });
    }
};

const buscarColaboradoresDeUsuario = async (req, res) => {
    const { responsable } = req.params;
    try {
        const tareas = await Tarea.find({ responsable });

        const colaboradores = tareas.reduce((acc, tarea) => {
            tarea.colaboradores.forEach(colaborador => {
                if (!acc.includes(colaborador)) {
                    acc.push(colaborador);
                }
            });
            return acc;
        }, []);

        if (colaboradores.length === 0) {
            return res.status(404).json({ message: 'No se encontraron colaboradores para este usuario' });
        }

        res.status(200).json(colaboradores);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los colaboradores' });
    }
};



module.exports = {
    getAllTareas,
    getTarea,
    createTarea,
    updateTarea,
    deleteTarea,
    getTareasPorHabilidad,
    getTareasPorColaborador,
    asignarColaboradorATarea,
    buscarCandidatos,
    getTareasCompletamenteAsignadas,
    buscarColaboradoresDeUsuario
};
