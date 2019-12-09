import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    name: 'dashboard',
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'users',
        name: 'users',
        component: () => import(/* webpackChunkName: "UserManagement" */ '../views/dashboardContent/UserManagement.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create-user',
        name: 'create-user',
        component: () => import(/* webpackChunkName: "createUser" */ '../views/dashboardContent/user/createUser.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'products',
        name: 'products',
        component: () => import(/* webpackChunkName: "ProductManagement" */ '../views/dashboardContent/ProductManagement.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'create-product',
        name: 'create-product',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/createProduct.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'edit-product/:id',
        name: 'edit-product',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/createProduct.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'animal-management',
        name: 'animal-management',
        component: () => import(/* webpackChunkName: "about" */ '../views/dashboardContent/product/animal-management.vue'),
        meta: { requiresAuth: true }
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
    next({ name: 'login' })
    return
  }
  if ((to.name === 'login') && store.state.isLoggedIn) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
