import { createRouter, createWebHistory } from 'vue-router';
import ThreeDObjectGenerator from '../components/ThreeDObjectGenerator.vue';

const routes = [
  {
    path: '/geometry1',
    component: ThreeDObjectGenerator,
    props: { geometry: [[0,0],[0,10],[15,10],[7,15],[7,8],[7,0]], editableHeight: 10, objectColor: '#ff00f2' }
  },
  {
    path: '/geometry2',
    component: ThreeDObjectGenerator,
    props: { geometry: [[0,0], [7,12], [0,14]], editableHeight: 15, objectColor: '#ff0000' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
