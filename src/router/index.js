import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/UserManagement.vue')
      },
      {
        path: 'create-user',
        name: 'create-user',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/user/createUser.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/ProductManagement.vue')
      },
      {
        path: 'create-product',
        name: 'create-product',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/createProduct.vue')
      },
      {
        path: 'edit-product/:id',
        name: 'edit-product',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/createProduct.vue')
      },
      {
        path: 'animal-management',
        name: 'animal-management',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/animal-management.vue')
      }
    ]
  },
  {
    path: '/',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let apitoken = sessionStorage.getItem('jdih-token')
  if (apitoken === null && to.name !== 'login') {
    next({ name: 'login' })
  } else if (to.name === 'login' && apitoken !== null) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
