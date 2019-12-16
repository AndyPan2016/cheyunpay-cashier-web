/**
 * 二维码收款
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日22:04:19
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)
let Form = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { LANG } = Configs.require()
let { PlaceCardPayService } = Services.require()

export default {
  data () {
    return {
      // 技术支持
      technicalSupport: LANG.technicalSupport,
      formData: {
        remark: null
      },
      posList: [
        {
          boxShadow: false,
          head: { text: '二维码收款', icon: 'icon-qrcode-right' },
          body: {
            type: 'txt-input',
            groups: [
              { label: '付款给', itemClass: 'group-item-txt', text: '', modelType: 'txt' },
              { label: '￥', itemClass: 'group-item-inp', labelType: 'lab-222', vModel: null, verify: 'float2', modelType: 'number', modelPlaceHolder: '请输入交易金额' }
            ]
          }
        }
      ]
    }
  },
  components: {
    'pos-list-item': PosListItemBlock,
    'tip-popup': Popup,
    'collection-form': Form
  },
  methods: {
    surePay () {
      let amount = this.posList[0].body.groups[1].vModel
      if (!amount || amount === '0') {
        this.$refs['tip-popup'].tip('请输入金额，且不能为0')
        return
      }
      if (amount < 0) {
        this.$refs['tip-popup'].tip('金额不能为负数')
        return
      }
      // if ((amount + '').indexOf('.') > -1) {
      //   if (!(/^(-?\d+)(\.\d{1,2})?$/.test(amount))) {
      //     this.$refs['tip-popup'].tip('金额为两位小数')
      //     return
      //   }
      // }
      let tradePayType = 'TRADE_PAY_ALI'
      if (window.navigator.userAgent.indexOf('MicroMessenger') > 0) {
        // 微信
        tradePayType = 'TRADE_PAY_WEIXIN'
      } else if (window.navigator.userAgent.indexOf('AlipayClient') > 0) {
        // 支付宝
        tradePayType = 'TRADE_PAY_ALI'
      } else {
        this.$refs['tip-popup'].tip('请使用微信或支付宝支付')
        return
      }
      PlaceCardPayService.placeCardPayApply({
        amount,
        memo: this.formData.remark,
        tradePayType: tradePayType
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          let redirectUrl = entity.redirectUrl
          if (redirectUrl) {
            this.openHref(redirectUrl)
          }
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
      this.$store.dispatch('processStatusStoreUpdate', {
        // 标题
        title: '二维码收款',
        // 状态
        status: 'success',
        // 结果
        result: '交易成功',
        // 备注
        remark: false,
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
            }
          }
        ],
        forms: [
          [
            { label: '收款方', text: '奥迪同花顺汽车销售有限公司', class: 'lab3-txt7' },
            { label: '订单号', text: 'O00119030709335105701695', class: 'lab3-txt7' },
            { label: '交易金额', text: '￥485,000' }
          ]
        ]
      })
      // 去公共流程状态页
      // this.routeTo(PagesCommons.router(PagesCommons.processStatus))
    }
  },
  created () {
    this.setWebSiteTitle('二维码收款')
    let params = this.params()
    this.shopName = params.shopName
    this.barcodeNo = params.barcodeNo
    this.returnUrl = params.returnUrl
    this.posList[0].body.groups[0].text = params.shopName
  }
}
