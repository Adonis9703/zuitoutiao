'use strict'

import axios from 'axios'
import qs from 'qs'

export default {
  post (option) {
    return axios({
      method: 'post',
      baseURL: '',
      url: option.url,
      params: qs.stringify(option.params),
      // data: option.params,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  },
  get (option) {
    return axios({
      method: 'get',
      baseURL: '',
      url: option.url,
      timeout: 5000,
      headers: {
        // 'Content-Type': type !== 'json' ? 'application/x-www-form-urlencoded' : 'application/json;charset=UTF-8'
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
  }
}
