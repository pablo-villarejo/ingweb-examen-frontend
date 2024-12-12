const express = require('express')

// import json data
const colaboradores = require('../seeding/colaboradores.json')
const tareas = require('../seeding/tareas.json')

// import models
const Colaborador = require('../models/colaboradorModel')
const Tarea = require('../models/tareaModel')

const router = express.Router()

router.get('/', async (req, res) => {
    try {

        await Colaborador.deleteMany()
        await Tarea.deleteMany()
        await Colaborador.insertMany(colaboradores)
        await Tarea.insertMany(tareas)

        res.send('Data seeded')
    } catch (error) {
        res.status(500).send(error)
    }
}
)

module.exports = router