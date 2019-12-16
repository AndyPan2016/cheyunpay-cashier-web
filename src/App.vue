<template>
  <div id="app">
    <router-view/>
    <tip-popup ref="tip-popup" />
  </div>
</template>

<script>
// 引入自定义模块加载
// require('@/configs/module')
// axios请求拦截和自定义Vue属性
require('@/services/axios.service')
let Popup = Components.use(Components.popup)

export default {
  name: 'App',
  components: {
    'tip-popup': Popup
  },
  created () {
    // http请求服务集合对象
    window.apiService = {}
    // http请求响应拦截自定义(全局)函数
    window.responseIntercept = (response) => {
      // console.info(response)
      let that = this
      // 模拟一个异步，不影响正常的响应速度
      // setTimeout(function () {
      // 响应data
      let data = response.data
      // 当前请求url
      let configUrl = response.config.url || ''
      // 当前接口的服务名称key，以作为缓存key
      let urlSplit = configUrl.split('/')
      let key = urlSplit[urlSplit.length - 1].split('?')[0]
      key = (key || '').replace('.do', '')
      if (key || apiService) {
        let serviceItem = apiService[key]
        if (serviceItem) {
          // 如果指定字段缓存
          let serviceSync = serviceItem.sync
          let serviceStorage = serviceItem.storage
          if (serviceSync || serviceStorage) {
            // 遍历需要缓存的key及数据，并缓存
            let eachSyncKey = function (eachObject, eachData, storage) {
              let object
              let data
              for (let key in eachObject) {
                object = eachObject[key]
                data = eachData[key]
                if (object) {
                  if (typeof (object) === 'string') {
                    // 缓存数据
                    if (storage) {
                      that.setLocalStorage(object, JSON.stringify(data))
                    } else {
                      that.setCookie(object, data)
                    }
                  } else {
                    // 继续遍历
                    eachSyncKey(object, data, storage)
                  }
                }
              }
            }
            if (serviceSync) {
              eachSyncKey(serviceSync, data)
            }
            if (serviceStorage) {
              eachSyncKey(serviceStorage, data, true)
            }
          }
          // 如果需要vuex store缓存
          if (serviceItem.vxStore) {
            // 缓存响应的数据
            let responseStoreObject = {}
            responseStoreObject[key] = data
            that.$store.dispatch('responseStoreUpdate', responseStoreObject)
          }
        }
      }
      // }, 90)
    }
    let that = this
    window.requestIntercept = () => {
      that.$store.dispatch('processStatusStoreUpdate', {
        // 标题
        title: '错误',
        // 状态
        status: 'fail',
        // 结果
        result: '您还未登录',
        // 备注
        remark: '请先登录后再访问',
        // 按钮
        buttons: false
        // [
        //   {
        //     text: '完成',
        //     class: null,
        //     fn: () => {
        //       // 返回首页
        //       that.routeTo(PagesWallet.router(PagesWallet.index))
        //     }
        //   }
        // ]
      })
      // 去公共流程状态页
      that.routeTo(PagesCommons.router(PagesCommons.processStatus))
    }
    /**
     * 场景：
     * 钱包入口：
     * 1.钱包进入收银台，收银台的任何页面(非摆牌、一码付)浏览器后退，是否可回退到钱包
     * 2.钱包进入收银台，收银台任何页面(非摆牌、一码付)直接退出收银台(关闭浏览器或者直接重新进入钱包)，重新进入钱包，进入收银台任何页面(非摆牌、一码付)，浏览器后退，是否可回退到钱包
     * 3.钱包进入收银台，收银台任何页面(非摆牌、一码付)，刷新浏览器当前页面(此时的页面为收银台页面)，然后浏览器后退，是否可回退到钱包
     * 非钱包入口：
     * 1.新建一个测试页面(非钱包的页面)，给一个收银台入口(进入方式，与钱包进入收银台方式一致)，进入收银台，重复钱包入口场景流程，是否可回退到测试页面
     */
    // 用于记录是否已经进入过收银台内部页面，从而用来判断当用户后退到中转页时可继续后退回进入收银台的页面
    window.recordEntrtyInsidepage = undefined
    // 当用户进入中转页，中转页再进入内页时，会记录recordEntrtyInsidepage = true，表示用户进入过内页，但如果用户在内页刷新页面
    // window.recordEntrtyInsidepage就会被重置为空，所以这里判断，当页面刷新，href不是中转页的地址，同样记录recordEntrtyInsidepage = true
    // 以保证内页所有页面都会记录状态
    let href = window.location.href
    let isTransferIndex = href.indexOf(PagesTransfer.router())
    if (isTransferIndex < 0 || isTransferIndex === -1) {
      window.recordEntrtyInsidepage = true
    }
  },
  mounted () {
    window.appTipPopup = this.$refs['tip-popup']
  }
}
</script>

<style>
@import './assets/less/commons/_normalize.less';
@import './assets/fonts/fonts.less';

#app {
  font-family: 'webfont-regular', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 750px;
  margin: 0 auto;
}
</style>
