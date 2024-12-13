<template>
    <div :style="mapStyle" id="user-map"></div>
  </template>
  
  <script>
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  import axios from 'axios';
  
  export default {
    name: 'UserMapComponent',
    props: {
      email: {
        type: String,
        required: true,
      },
      width: {
        type: String,
        required: false,
        default: '100%',
      },
      height: {
        type: String,
        required: false,
        default: '100%',
      },
      zoom: {
        type: Number,
        required: false,
        default: 13,
      },
    },
    data() {
      return {
        markers: [], // Aquí almacenaremos los marcadores recibidos
      };
    },
    computed: {
      mapStyle() {
        return {
          width: this.width,
          height: this.height,
        };
      },
    },
    mounted() {
        this.fetchMapData();
    },
    methods: {
      async fetchMapData() {
        try {
            const response = await axios.get(`http://localhost:3001/api/map/${this.email}`);
            console.log('Response:', response.data.markers);
          if (response.data) {
            this.markers = response.data.markers;
            this.initMap();
          }
        } catch (error) {
          console.error('Error al obtener los datos del mapa:', error);
        }
      },
  
      initMap() {
        // Si no hay marcadores, no mostrar el mapa
        if (this.markers.length === 0) return;
  
        // Obtener las coordenadas del primer marcador para centrar el mapa
        const { lat, lon } = this.markers[0].coordinates;
        const map = L.map('user-map').setView([lat, lon], this.zoom);
  
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
  
        // Añadir todos los marcadores
        this.markers.forEach(marker => {
          const { locationName, coordinates, imageURL } = marker;
          L.marker([coordinates.lat, coordinates.lon])
            .addTo(map)
            .bindPopup(`
              <strong>${locationName}</strong>
              <br><img src="${imageURL}" alt="image" style="width: 100px; height: 100px;">
            `)
            .openPopup();
        });
      },
    },
  };
  </script>
  
  <style scoped>
  #map {
    width: 100% !important;
    height: 400px !important;
  }
  </style>
  