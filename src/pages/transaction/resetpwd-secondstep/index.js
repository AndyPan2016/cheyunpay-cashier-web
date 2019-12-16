/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { PayPswService } = Services.require()
let { utils } = Utils.require()
// let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        IDNumber: null
      },
      businessType: null,
      cardId: null,
      accessToken: null,
      type: null
    }
  },
  components: {
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {
      let formItem = target.parentNode.parentNode
      utils.addClass(formItem, 'error')
    },
    formVerifySuccessEvent (myFormData) {
      let IDNumber = myFormData.IDNumber
      if (IDNumber) {
        this.$refs['tip-popup'].loading('正在校验身份证...')
        PayPswService.checkCertNo({
          businessType: this.businessType,
          accessToken: this.accessToken,
          certNo: IDNumber
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity || {}
            if (this.businessType === 'RESET_MOBILE_NO') {
              // 重置手机号身份验证成功跳转
              this.routeTo(PagesMemberCenter.router(PagesMemberCenter.resetPhoneThirdStep), {
                query: {
                  type: this.type,
                  businessType: this.businessType,
                  accessToken: entity.accessToken,
                  realName: entity.realName
                }
              })
            } else {
              // 重置登录、支付密码身份验证成功跳转
              this.routeTo(PagesTransaction.router(PagesTransaction.resetPwdThirdStep), {
                query: {
                  type: this.type,
                  businessType: this.businessType,
                  accessToken: entity.accessToken,
                  realName: entity.realName
                }
              })
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('重置密码')
    let params = this.params()
    this.type = params.type
    this.cardId = params.cardId
    this.accessToken = params.accessToken
    this.businessType = params.businessType
  }
}
