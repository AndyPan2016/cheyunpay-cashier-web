/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { PayPswService } = Services.require()
let { utils } = Utils.require()
// let { LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        verifyCode: null
      },
      userNo: null,
      businessType: null,
      accountNo: null,
      mobileNo: null,
      phoneEncryptionNo: null,
      send: null,
      sendBtnText: '发送验证码'
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
      let verifyCode = myFormData.verifyCode
      if (verifyCode) {
        this.$refs['tip-popup'].loading('正在校验短信...')
        PayPswService.checkSmsCaptcha({
          businessType: this.businessType,
          captcha: verifyCode,
          mobileNo: this.mobileNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity || {}
            this.routeTo(PagesTransaction.router(PagesTransaction.resetPwdSecondStep), {
              query: {
                type: this.type,
                businessType: this.businessType,
                cardId: entity.idCardNoEnd,
                accessToken: entity.accessToken
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
    sendSmsCaptcha (e) {
      let target = e.target || e.srcElement
      this.send = true
      if (!utils.hasClass(target, 'button-disabled')) {
        PayPswService.sendSmsCode({
          businessType: this.businessType,
          mobileNo: this.mobileNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].toast('发送成功')
            this.countDown({
              timer: 59,
              fn: (count) => {
                this.sendBtnText = count + '秒后重新发送'
              },
              callBack: () => {
                this.sendBtnText = '发送验证码'
                this.send = false
              }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
            this.send = false
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
          this.send = false
        })
      }
    },
    toResetPayPsw () {
      PayPswService.toResetPayPsw({}).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          this.mobileNo = entity.mobileNo
          this.userNo = entity.userNo
          this.phoneEncryptionNo = this.phoneEncryption(entity.mobileNo)
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('重置密码')
    let params = this.params()
    this.type = params.type
    this.businessType = params.businessType
    this.toResetPayPsw()
  }
}
