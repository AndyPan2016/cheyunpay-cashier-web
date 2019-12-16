/**
 * 创建vuex实例
 * @author AndyPan
 * @createdate 2019年8月29日11:21:38
 * @lastupdatedate 2019年8月29日11:21:46
 * @remark
 */

import Vue from 'vue'
import Vuex from 'vuex'

let { HeaderStore } = StoreModules.require(StoreModules.header)
let { ProcessStatusStore } = StoreModules.require(StoreModules.processStatus)
let { ResponseStore } = StoreModules.require(StoreModules.response)

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HeaderStore,
    ProcessStatusStore,
    ResponseStore
  }
})

export default store
