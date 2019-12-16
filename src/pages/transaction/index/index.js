/**
 * POS申请记录详情
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日17:57:17
 */

let transactionHead = PagesCommons.use(PagesCommons.transactionHead)
let Froms = Components.use(Components.forms)
let AD = PagesCommons.use(PagesCommons.ad)
let Popup = Components.use(Components.popup)
let { STATUS } = Configs.require()
let { TradepayService } = Services.require()

export default {
  data () {
    return {
      formsDataset: [
        [
          {icon: 'icon-to-zfb', text: '支付宝支付', key: 'zfb', type: 'default'},
          {icon: 'icon-to-account', text: '账户余额支付', key: 'account', type: 'default'}
        ]
      ],
      transactionPayStore: {}
    }
  },
  components: {
    'transaction-head': transactionHead,
    'ad-list': AD,
    'my-forms': Froms,
    'tip-popup': Popup
  },
  methods: {
    /**
     * 表单点击事件
     * @param {Event} e 事件对象
     * @param {DOMElement} target 点击目标元素对象
     * @param {String} key 点击元素的key值
     */
    formClick (e, target, key) {
      this.$refs['tip-popup'].tip('加载中...')
      if (key === 'zfb') {
        // 支付宝
        this.tradePayApply()
      } else if (key === 'account') {
        // 账户余额
        TradepayService.tradePayApply({
          goodsName: this.transactionPayStore.goodsName,
          tradePayType: 'TRADE_PAY_BALLANCE'
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            let balance = entity.balance
            this.routeTo(PagesTransaction.router(PagesTransaction.surplusPay), {
              query: {
                balance
              }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    },
    tradePayApply () {
      TradepayService.tradePayApply({
        goodsName: this.transactionPayStore.goodsName,
        tradePayType: 'TRADE_PAY_ALI'
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          // let balance = entity.balance
          let codeUrl = entity.codeUrl
          this.openHref('alipayqr://platformapi/startapp?saId=10000007&qrcode=' + codeUrl)
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('交易')
    this.transactionPayStore = this.transfToJson(this.getLocalStorage(STATUS.TRANSACTIONPAYSTORE))
  }
}
