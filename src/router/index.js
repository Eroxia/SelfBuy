import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import StaffsAdd from '@/components/StaffsAdd'
import Devices from '@/components/Devices'
import Goods from '@/components/Goods'
import GoodsAdd from '@/components/GoodsAdd'
import Add from '@/components/Add'
import Brand from '@/components/Brand'
import Pvalues from '@/components/Pvalues'
import Category from '@/components/Category'
import Home from '@/components/Home'
import Navigation from '@/components/Navigation'
import Order from '@/components/Order'
import Staff from '@/components/Staff'
import Details from '@/components/Details'
import TotalStock from '@/components/TotalStock'
import Replenishment from '@/components/Replenishment'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/nav',
      component: Navigation,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          component: Hello
        },
        {
          path: 'order',
          component: Order
        },
        {
          path: 'staffsAdd',
          component: StaffsAdd
        },
        {
          path: 'devices',
          component: Devices
        },
        {
          path: 'goods',
          component: Goods
        },
        {
          path: 'goods_add',
          component: GoodsAdd
        },
        {
          path: 'category',
          component: Category
        },
        {
          path: 'pvalues',
          component: Pvalues
        },
        {
          path: 'brand',
          component: Brand
        },
        {
          path: 'staff',
          component: Staff
        },
        {
          path: 'staffs_add',
          component: StaffsAdd
        },
        {
          path: 'add',
          component: Add
        },
        {
          path: 'add/:id',
          name: 'details',
          component: Details
        },
        {
          path: 'devices/:id',
          name: 'Replenish',
          component: Replenishment
        },
        {
          path: 'add/:id',
          name: 'totalStock',
          component: TotalStock
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login'
      })
    }

  } else {
    next() // make sure to always call next()!
  }
})

export default router
