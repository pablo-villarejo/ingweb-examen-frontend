const mongoose = require('mongoose');

const markerSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
  },
  coordinates: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  imageURL: {
    type: String,
    required: false, // Opcional si no se carga imagen
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const visitSchema = new mongoose.Schema({
  visitorEmail: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const mapSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Cada usuario tiene un único mapa
  },
  markers: {
    type: [markerSchema], // Lista de marcadores
    default: [],
  },
  visits: {
    type: [visitSchema], // Lista de visitas recibidas
    default: [],
  },
});

module.exports = mongoose.model('Map', mapSchema);