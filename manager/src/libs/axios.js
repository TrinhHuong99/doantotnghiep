import Vue from 'vue'
import axios from 'axios'
import Config from '../../config'

// axios

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: Config.apiUrl,
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

Vue.prototype.$http = axiosIns

export default axiosIns
