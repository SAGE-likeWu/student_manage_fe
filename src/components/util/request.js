import axios from 'axios'
import store from '@/store'
import {getToken} from './auth'
import Vue from "vue";
import ElementUI from "element-ui";
// import Alert from '@/components/fw/Alert/alert'
// import {loginOut} from '@/components/common/Dialog/loginOut'

// create an axios instance
const service = axios.create({
  baseURL: '' // api的base_url
  // timeout: 10000 // request timeout
})
const defaultConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  // withCredentials: true
}

const urlFormer = '' // /fwtrade

// request interceptor
service.interceptors.request.use(config => {
  if (/^\/(api)\//.test(config.url)) {
    config.url = urlFormer + config.url
    // config.url = urlFormer + 'api/waybill/find'
  }
  config.baseURL = 'http://localhost:8443'
  config = Object.assign({}, defaultConfig, config)
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key
  }

  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    let data = response.data
    if (data.code === 101 && !store.getters.isNotLogin) {
      return data
      // loginOut()  xxx TODO
    }
    return data
  },
  error => {
    console.log('err' + error)// for debug
    /*if (error.request.status === 405 && !store.getters.isNotLogin) {
      loginOut()
    }*/

   /* Alert.error({
      duration: 2000,
      content: error.message
    })*/
    return Promise.reject(error)
  }
)

export default async (options) => {
  let res = await service(options)
  return res
}


// 设置反向代理，前端请求默认发送到 http://localhost:8443/api
// axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
/*Vue.prototype.$axios = Axios
Vue.config.productionTip = false
Vue.use(ElementUI)*/
