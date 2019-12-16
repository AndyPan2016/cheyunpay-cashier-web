/**
 * 线下充值
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日21:34:05
 */

let Form = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { RechargeService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      returnUrl: null,
      rechargeResult: {}
    }
  },
  components: {
    'tip-popup': Popup,
    'recharge-form': Form
  },
  methods: {
    /**
     * 完成点击事件
     */
    complateClickEvent () {
      let returnUrl = this.returnUrl || this.getCookie(STATUS.BUSINESSRETURNURL)
      if (returnUrl) {
        this.openHref(returnUrl)
      }
    },
    toRecharge (e, target, key) {
      this.$refs['tip-popup'].tip('请稍等,正在处理中...')
      RechargeService.recharge({
        rechargeType: 'RECHARGE_OFFLINE'
      }).then(res => {
        let data = res.data
        if (data.success) {
          this.rechargeResult = data.entity || {}
          this.$refs['tip-popup'].tip(data.message)
        } else {
          this.$refs['tip-popup'].tip(data.message)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    }
  },
  created () {
    this.setWebSiteTitle('充值')
    this.returnUrl = this.params('returnUrl')
  },
  mounted () {
    this.toRecharge()
  }
}
