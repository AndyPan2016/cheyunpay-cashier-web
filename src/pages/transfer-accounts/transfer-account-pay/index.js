/**
 * 二维码收款
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日22:04:19
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)
let Form = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let PasswordBox = Components.use(Components.passwordbox)
let { TransferAccountsService } = Services.require()
let { utils } = Utils.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      formData: {
        transferRemark: null,
        amount: null,
        recRealName: null,
        recUserNo: null
      },
      posList: [
        {
          boxShadow: false,
          head: { text: '转账', icon: 'icon-transfer-right' },
          body: {
            type: 'txt-input',
            groups: [
              { label: '可用余额：', itemClass: 'group-item-txt', modelType: 'txt' },
              { label: '￥', itemClass: 'group-item-inp', labelType: 'lab-222', verify: 'float2', vModel: null, modelType: 'number', modelPlaceHolder: '请输入交易金额' }
            ]
          }
        }
      ],
      submitBtnStatus: false,
      payPassword: null,
      returnUrl: null,
      blanceMoney: 0
    }
  },
  components: {
    'pos-list-item': PosListItemBlock,
    'tip-popup': Popup,
    'transfer-form': Form,
    'password-box': PasswordBox
  },
  methods: {
    surePay () {
      let payPassword = this.payPassword
      if (payPassword && payPassword.length === 6) {
        this.$refs['tip-popup'].loading('请稍等，正在支付...')
        this.formData.amount = this.posList[0].body.groups[1].vModel
        this.formData.payPassword = this.payPassword
        TransferAccountsService.transferConfirm(this.formData).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            let thisStatus = LANG.transferAccountStatus[entity.tradeStatus] || {}
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '转账',
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
      // this.$refs['tip-popup'].tip('忘记密码')
      this.routeTo(PagesTransaction.router(PagesTransaction.resetPwdFirstStep), {
        query: {
          // 设置完成后判断回跳页面类型
          type: 'transferaccounts',
          // 业务类型：重置支付密码
          businessType: 'RESET_PAY_PASSWORD'
        }
      })
    },
    sureToPay (e) {
      let target = e.target || e.srcElement
      let amount = this.posList[0].body.groups[1].vModel
      if (!utils.hasClass(target, 'button-disabled')) {
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
        // 判断当前余额是否足够支付
        if (amount > this.blanceMoney) {
          this.$refs['tip-popup'].tip('余额不足')
          return
        }
        this.$refs['j-popup-pwd-box'].open()
      }
    },
    transferQueryInfo () {
      TransferAccountsService.transferQueryInfo({
        recRealName: this.formData.recRealName,
        recUserNo: this.formData.recUserNo
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          this.blanceMoney = this.transferMoney(entity.balance)
          this.posList[0].body.groups[0].label = '可用余额：' + this.blanceMoney
        } else {
          this.$refs['tip-popup'].tip(data.message)
          let that = this
          setTimeout(() => {
            that.historyBack()
          }, 2000)
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
        let that = this
        setTimeout(() => {
          that.historyBack()
        }, 2000)
      })
    },
    inputBlurEvent (e, target, value) {
      if (value && value !== '0') {
        this.submitBtnStatus = true
      } else {
        this.submitBtnStatus = false
      }
    },
    focusEvent (e) {
      this.$refs['j-popup-pwd-box'].setPopupToTop('near-top')
    },
    blurEvent (e) {
      this.$refs['j-popup-pwd-box'].setPopupToTop('')
    }
  },
  created () {
    this.setWebSiteTitle('确认转账')
    let params = this.params()
    this.returnUrl = params.returnUrl || this.getCookie(STATUS.BUSINESSRETURNURL)
    this.formData.recRealName = params.memberName
    this.formData.recUserNo = params.memberId
    this.transferQueryInfo()
  }
}
