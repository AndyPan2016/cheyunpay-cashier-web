/**
 * 账户余额支付
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日17:34:45
 */

let transactionHead = PagesCommons.use(PagesCommons.transactionHead)
let Froms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let PasswordBox = Components.use(Components.passwordbox)
let { TradepayService } = Services.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      payPassword: null,
      returnUrl: null,
      balance: null,
      serviceMoney: 0,
      amount: 0,
      amountAll: 0,
      transactionPayStore: {}
    }
  },
  components: {
    'transaction-head': transactionHead,
    'my-forms': Froms,
    'tip-popup': Popup,
    'password-box': PasswordBox
  },
  methods: {
    sureToPay () {
      // 获取当前交易金额
      let transactionPayStore = this.transfToJson(this.getLocalStorage(STATUS.TRANSACTIONPAYSTORE))
      let amount = this.transferMoney(transactionPayStore.amount)
      // 判断当前余额是否足够支付
      if (amount > this.balance) {
        this.$refs['tip-popup'].tip('余额不足')
        return
      }
      this.$refs['j-popup-pwd-box'].open()
    },
    surePay () {
      if (this.payPassword && this.payPassword.length === 6) {
        this.$refs['tip-popup'].loading('支付中...')
        TradepayService.tradePayConfirm({
          payPassword: this.payPassword,
          tradePayType: 'TRADE_PAY_BALLANCE'
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            let tradeStatus = entity.tradeStatus
            let thisStatus = LANG.transactionTradeStatus[tradeStatus] || {}
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '交易支付',
              // 状态
              status: thisStatus.key,
              // 结果
              result: thisStatus.result,
              // 备注
              remark: thisStatus.remark,
              // 按钮容器样式
              btnWrapClass: 'fixed-bottom-wrap',
              // 广告
              ad: true,
              // 按钮
              buttons: [
                {
                  text: '完成',
                  fn: () => {
                    // this.routeTo(PagesPos.router(PagesPos.index))
                    let returnUrl = this.returnUrl
                    if (returnUrl) {
                      this.openHref(returnUrl)
                    }
                  }
                }
              ]
              // forms: [
              //   [
              //     { label: '收款方', text: '奥迪同花顺汽车销售有限公司', class: 'lab3-txt7' },
              //     { label: '商品', text: '奥迪A4L 2019款 35 TFSI 进取型', class: 'lab3-txt7' },
              //     { label: '订单号', text: 'O00119030709335105701695', class: 'lab3-txt7' },
              //     { label: '交易金额', text: '￥485,000' }
              //   ]
              // ]
            })
            // 去公共流程状态页
            this.routeTo(PagesCommons.router(PagesCommons.processStatus))
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else {
        console.info(this.payPassword)
        this.$refs['tip-popup'].tip('密码长度为6位')
      }
    },
    onComplatePwd (payPassword) {
      this.payPassword = payPassword
    },
    onChangePwd (payPassword) {
      this.payPassword = payPassword
    },
    resetPay () {
      this.$refs['j-popup-pwd-box'].close()
    },
    forgetPwd () {
      this.routeTo(PagesTransaction.router(PagesTransaction.resetPwdFirstStep), {
        query: {
          // 设置完成后判断回跳页面类型
          type: 'transaction',
          // 业务类型：重置支付密码
          businessType: 'RESET_PAY_PASSWORD'
        }
      })
    },
    focusEvent (e) {
      this.$refs['j-popup-pwd-box'].setPopupToTop('near-top')
    },
    blurEvent (e) {
      this.$refs['j-popup-pwd-box'].setPopupToTop('')
    }
  },
  created () {
    this.setWebSiteTitle('交易支付')
    let params = this.params()
    this.returnUrl = params.returnUrl || this.getCookie(STATUS.BUSINESSRETURNURL)
    this.balance = this.transferMoney(params.balance)
    this.transactionPayStore = this.transfToJson(this.getLocalStorage(STATUS.TRANSACTIONPAYSTORE))
    this.amount = this.transferMoney(this.transactionPayStore.amount)
    this.amountAll = this.amount + this.serviceMoney
  }
}
