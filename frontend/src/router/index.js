import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AddMarkerView from '../views/AddMarkerView.vue';
import MyMapView from '../views/MyMapView.vue';
import VisitMapView from '../views/VisitMapView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/add-marker',
      name: 'add-marker',
      component: AddMarkerView,
    },
    {
      path: '/my-map',
      name: 'my-map',
      component: MyMapView,
    },
    {
      path: '/visit-map',
      name: 'visit-map',
      component: VisitMapView,
    },
  ],
});

export default router;
