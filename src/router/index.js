import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/common/Home'
import SelectInformation from '@/components/information/SelectInformation'
import InsertInformation from '@/components/information/InsertInformation'
import UpdateInformation from '@/components/information/UpdateInformation'
import cookies from 'js-cookie'
import Vuex from 'vuex'


Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/login',
      children: [
        {
          path: '/information/select',
          name: 'SelectInformation',
          component: SelectInformation,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/information/update',
          name: 'UpdateInformation',
          component: UpdateInformation,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/information/insert',
          name: 'InsertInformation',
          component: InsertInformation,
          meta: {
            requireAuth: true
          }
        }
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },


 ],


})
