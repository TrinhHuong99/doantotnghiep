import Vue from 'vue'
import Config from '../../config'
import store from '../store/store'
// axios
import axios from 'axios'

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: Config.apiUrl,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})


axiosIns.interceptors.request.use(
  response => {
    store.commit('PAGE_LOADING', true)
    return response
  },
  error => Promise.reject(error),
)

axiosIns.interceptors.response.use(
  response => {
    store.commit('PAGE_LOADING', false)
    return response
  },
  error => {
    store.commit('PAGE_LOADING', false)
    return Promise.reject(error)
  },
)


Vue.prototype.$http = axiosIns

export default axiosIns
