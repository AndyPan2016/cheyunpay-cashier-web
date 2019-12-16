/**
 * 设置登录信息
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日20:55:04
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let { PayPswService } = Services.require()
let { utils } = Utils.require()
let { LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        userName: null,
        loginPassword: null,
        payPassword: null,
        verifyCode: null,
        accessToken: null
      },
      sceneType: null,
      userNo: null,
      accountNo: null,
      mobileNo: null,
      mobileEncryptionNo: null,
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
        let businessType = LANG.businessType['setPassword'] || {}
        PayPswService.checkSmsCaptcha({
          businessType: businessType.key,
          captcha: verifyCode,
          mobileNo: this.mobileNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            this.formData.accessToken = entity.accessToken
            PayPswService.setLoginInfo(this.formData).then(res => {
              let data = res.data
              if (data.success) {
                let sceneType = this.sceneType
                if (sceneType === 'WITHDRAW') {
                  // 提现
                  this.routeTo(PagesWithdrawal.router())
                } else if (sceneType === 'TRANSFER_ACCOUNT') {
                  // 转账
                  this.routeTo(PagesTransferAccounts.router())
                } else if (sceneType === 'TRADE_PAY') {
                  // 交易支付
                  this.routeTo(PagesTransaction.router())
                } else if (sceneType === 'RECHARGE') {
                  // 充值
                } else if (sceneType === 'PLACE_CARD_PAY') {
                  // 摆牌
                } else if (sceneType === 'ONE_CODE_PAY') {
                  // 一码付
                }
              } else {
                this.$refs['tip-popup'].tip(data.message)
              }
            }).catch(err => {
              this.$refs['tip-popup'].tip(err.message)
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
        let businessType = LANG.businessType['setPassword'] || {}
        PayPswService.sendSmsCode({
          businessType: businessType.key,
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
    }
  },
  created () {
    this.setWebSiteTitle('设置登录密码')
    let params = this.params()
    this.mobileNo = params.mobileNo
    this.mobileEncryptionNo = this.phoneEncryption(params.mobileNo)
    this.sceneType = params.sceneType
  }
}
