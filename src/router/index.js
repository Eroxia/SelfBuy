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
Vue.use(Router)

export default new Router({
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
        }
      ]
    }
  ]
})
