const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000
const MONGO_URI= process.env.MONGO_URI || "mongodb://admin:admin@localhost:27017/examenBackend?authSource=admin"

const colaboradorRouter = require('./src/routes/colaboradorRouter')
const tareaRouter = require('./src/routes/tareaRouter')
const cloudinaryRouter = require('./src/routes/cloudinaryRouter');
const mapRouter = require('./src/routes/mapRouter')

const seedingRouter = require('./src/routes/seedingRouter')

app.use(cors());

app.use('/api/cloudinary', cloudinaryRouter)
app.use('/api/colaboradores', colaboradorRouter)
app.use('/api/tareas', tareaRouter)
app.use('/api/map', mapRouter)

app.use('/seeding', seedingRouter)

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(PORT, () => {
            console.log(`App listening on http://localhost:${PORT}`)
        })
    }
)