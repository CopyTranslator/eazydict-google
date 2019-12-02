'use strict'

const axios = require('axios')
const pRetry = require('p-retry')

/* eslint-disable max-len */
const headers = {
  accept: 'text/html',
  'accept-encoding': 'gzip,deflate',
  'accept-language': 'zh-CN,zh;q=0.8',
  'cache-control': 'no-cache',
  pragma: 'no-cache',
  referer: 'https://translate.google.cn/',
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.104 Safari/537.36'
}
/* eslint-enable max-len */

function main (url, configs, responseType = 'json') {
  let retryOptions = {
    retries: configs.retries
  }

  let fetchOptions = {
    headers,
  }

  return pRetry(function () {
    return axios.get(url, fetchOptions).then(response => response.data)
  }, retryOptions)
}

module.exports = main
