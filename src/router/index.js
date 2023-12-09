import { createRouter, createWebHistory } from 'vue-router'
import ThreeDObjectGenerator from '../components/ThreeDObjectGenerator.vue'

// Define routes for your application. Each route is mapped to a component.
const routes = [
  {
    // The path for the first geometry configuration
    path: '/geometry1',
    component: ThreeDObjectGenerator,
    // Props passed to the ThreeDObjectGenerator component
    props: {
      geometry: [
        [0, 0],
        [0, 10],
        [15, 10],
        [7, 15],
        [7, 8],
        [7, 0]
      ],
      editableHeight: 10,
      objectColor: '#ff00f2'
    }
  },
  {
    // The path for the second geometry configuration
    path: '/geometry2',
    component: ThreeDObjectGenerator,
    props: {
      geometry: [
        [0, 0],
        [7, 12],
        [0, 14]
      ],
      editableHeight: 15,
      objectColor: '#ff0000'
    }
  }
]
// Create and export the Vue router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
