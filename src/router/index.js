import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Score from '@/components/Score'
import Home from '@/components/common/Home'
import SelectScore from '@/components/score/SelectScore'
import InsertScore from '@/components/score/InsertScore'
import UpdateScore from '@/components/score/UpdateScore'
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
          path: '/score/select',
          name: 'SelectScore',
          component: SelectScore,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/score/update',
          name: 'UpdateScore',
          component: UpdateScore,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/score/insert',
          name: 'InsertScore',
          component: InsertScore,
          meta: {
            requireAuth: true
          }
        },
      ]
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },


 ],


})
