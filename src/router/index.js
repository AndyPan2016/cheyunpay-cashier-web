import Vue from 'vue'
import Router from 'vue-router'
require('@/configs/module')
// let { utils } = Utils.require()
// let { STATUS } = Configs.require()
let PageIndex = PagesLayout.use(PagesLayout.index)
let NotFound = PagesCommons.use(PagesCommons['404'])
// let Test = PagesCommons.use(PagesCommons.test)

let LayoutTransfer = PagesLayout.use(PagesLayout.transfer)
let LayoutCommon = PagesLayout.use(PagesLayout.common)
let LayoutRecharge = PagesLayout.use(PagesLayout.recharge)
let LayoutQRCodeCollection = PagesLayout.use(PagesLayout.qrcodeCollection)
let LayoutTransferAccounts = PagesLayout.use(PagesLayout.transferAccounts)
let LayoutWithdrawal = PagesLayout.use(PagesLayout.withdrawal)
let LayoutTransaction = PagesLayout.use(PagesLayout.transaction)

Vue.use(Router)

// 路由配置
const routes = [
  // 首页
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex
  },
  // 测试
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: Test,
  //   remark: '组件测试',
  //   pages: {
  //     test: { key: '', text: '组件测试' }
  //   }
  // },
  // Layout-中转页
  {
    path: '/layout-transfer/:page',
    name: 'LayoutTransfer',
    component: LayoutTransfer,
    remark: '中转页',
    key: 'PagesTransfer'
  },
  // 充值
  {
    path: '/layout-recharge/:page',
    name: 'LayoutRecharge',
    component: LayoutRecharge,
    remark: '充值',
    key: 'PagesRecharge'
  },
  // 二维码收款
  {
    path: '/layout-qrcode-collection/:page',
    name: 'LayoutQRCodeCollection',
    component: LayoutQRCodeCollection,
    remark: '二维码收款',
    key: 'PagesQRCodeCollection'
  },
  // 转账
  {
    path: '/layout-transfer-accounts/:page',
    name: 'LayoutTransferAccounts',
    component: LayoutTransferAccounts,
    remark: '转账',
    key: 'PagesTransferAccounts'
  },
  // 提现
  {
    path: '/layout-withdrawal/:page',
    name: 'LayoutWithdrawal',
    component: LayoutWithdrawal,
    remark: '提现',
    key: 'PagesWithdrawal'
  },
  // 交易
  {
    path: '/layout-transaction/:page',
    name: 'LayoutTransaction',
    component: LayoutTransaction,
    remark: '交易',
    key: 'PagesTransaction'
  },
  // 公共模块、页面
  {
    path: '/layout-common/:page',
    name: 'LayoutCommon',
    component: LayoutCommon,
    // remark: '公共模块',
    key: 'PagesCommons'
  },
  // 404
  { path: '*', component: NotFound }
]

;((routes, win) => {
  let i = 0
  let len = routes.length
  let route
  let key
  for (; i < len; i++) {
    route = routes[i]
    key = route.key
    if (key) {
      if (win[key]) {
        ((route) => {
          win[key]['router'] = (name) => {
            return route.path.replace(':page', name || 'index')
          }
        })(route)
        route['pages'] = win[key].fileName
      }
    }
  }
})(routes, window)

// 创建router对路由进行管理，由构造函数 new Router()创建，接收routes参数
const router = new Router({
  // base: '/ui/',
  mode: 'history',
  routes: routes
})

// 路由拦截器
router.beforeEach((to, from, next) => {
  // let userNo = utils.getCookie(STATUS.USERNO)
  // if (!userNo && to.path !== '/' && to.path !== '/layout-transfer/index' && to.path !== '/layout-common/process-status') {
  //   next({path: '/layout-transfer/index'})
  // } else {
  //   next()
  // }
  next()
})

export default router
