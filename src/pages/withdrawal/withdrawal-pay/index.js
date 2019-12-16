/**
 * 银行账户管理
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月18日22:17:38
 */

let PosListItemBlock = PagesCommons.use(PagesCommons.posListItem)
let DataSet = Components.use(Components.dataset)
let Forms = Components.use(Components.forms)
let AD = PagesCommons.use(PagesCommons.ad)
let Popup = Components.use(Components.popup)
let PasswordBox = Components.use(Components.passwordbox)
let { WithdrawalService } = Services.require()
let { utils } = Utils.require()
let { STATUS, LANG } = Configs.require()

export default {
  data () {
    return {
      tabType: 'available',
      // 选项卡及路由
      tabRoutes: [
        { key: 'available', text: '可用余额', active: true },
        { key: 'ontheway', text: '在途资金', active: false }
      ],
      dataset: [{}],
      posList: [
        {
          boxShadow: false,
          head: { text: '标准提现', icon: 'icon-transfer-right' },
          body: {
            type: 'txt-input',
            groups: [
              { label: '可用余额：￥0.00', itemClass: 'group-item-txt btn-fd-txt', text: '全部提现', modelType: 'txt' },
              { label: '￥', itemClass: 'group-item-inp', labelType: 'lab-222', verify: 'float2', vModel: null, modelType: 'number', modelPlaceHolder: '请输入交易金额' }
            ]
          }
        }
      ],
      returnUrl: null,
      // 提现类型
      withdrawType: null,
      // 提现信息
      withdrawInfo: {},
      withdrawChargeInfo: { amount: 0, chargeAmount: 0, realAmount: 0 },
      submitBtnStatus: false,
      payPassword: null
    }
  },
  components: {
    'tip-popup': Popup,
    'ad-list': AD,
    'pos-list-item': PosListItemBlock,
    'my-forms': Forms,
    'dataset': DataSet,
    'password-box': PasswordBox
  },
  methods: {
    renderNullDataset () {
      this.$store.dispatch('processStatusStoreUpdate', {
        // 标题
        title: false,
        // 状态
        status: 'bind-card',
        // 结果
        result: '',
        // 备注
        remark: '还未绑定提现银行账户',
        // 按钮
        buttons: [
          {
            text: '添加银行账户',
            class: null,
            fn: () => {
              // let memberInfo = this.transfToJson(this.getLocalStorage(STATUS.MEMBERINFO))
              // let memberType = memberInfo.memberType
              // if (memberType === 'BUSINESS') {
              //   // 企业
              //   this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bindCardBusiness))
              // } else {
              //   // 个人、个体、运营商
              //   this.routeTo(PagesMemberCenter.router(PagesMemberCenter.bindCard))
              // }
            }
          }
        ],
        ad: true,
        adModel: 'static'
      })
    },
    tabClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'tab-route-item')) {
        let key = target.getAttribute('data-key')
        if (key) {
          this.tabType = key
          this.renderTabType(key)
        }
      }
    },
    renderTabType (type) {
      type = type || this.tabType
      for (let key in this.tabRoutes) {
        this.tabRoutes[key].active = type === this.tabRoutes[key].key
      }
    },
    sureToWithdrawal (e) {
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
        // 可用余额
        let blanceMoney = this.withdrawInfo.blanceMoney
        // 判断当前余额是否足够支付
        if (amount > blanceMoney) {
          this.$refs['tip-popup'].tip('余额不足')
          return
        }
        this.$refs['j-popup-pwd-box'].open()
      }
    },
    onComplatePwd (payPassword) {
      this.payPassword = payPassword
    },
    onChangePwd (payPassword) {
      this.payPassword = payPassword
    },
    sureWithdrawal (e) {
      let payPassword = this.payPassword
      if (payPassword && payPassword.length === 6) {
        this.$refs['j-popup-pwd-box'].close()
        this.$refs['tip-popup'].loading('请稍等,正在处理中...')
        WithdrawalService.withdrawConfirm({
          amount: this.posList[0].body.groups[1].vModel,
          payPassword,
          withdrawType: this.withdrawType,
          bindNo: this.withdrawInfo.bindNo
        }).then(res => {
          let data = res.data
          if (data.success) {
            let entity = data.entity
            let thisStatus = LANG.tradeStatus[entity.tradeStatus] || {}
            this.$store.dispatch('processStatusStoreUpdate', {
              // 标题
              title: '提现',
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
              adModel: null,
              // 按钮
              buttons: [
                {
                  text: '完成',
                  fn: () => {
                    let returnUrl = this.returnUrl
                    if (returnUrl) {
                      this.openHref(returnUrl)
                    }
                  }
                }
              ]
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
    resetPay () {
      this.$refs['j-popup-pwd-box'].close()
    },
    forgetPwd () {
      // this.$refs['tip-popup'].tip('忘记密码')
      this.routeTo(PagesTransaction.router(PagesTransaction.resetPwdFirstStep), {
        query: {
          // 设置完成后判断回跳页面类型
          type: 'withdrawal',
          // 业务类型：重置支付密码
          businessType: 'RESET_PAY_PASSWORD'
        }
      })
    },
    withdrawalClick (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'fd-item-txt')) {
        this.posList[0].body.groups[1].vModel = this.withdrawInfo.blanceMoney
        this.inputBlurEvent(e, target, this.withdrawInfo.blanceMoney)
      }
    },
    withdrawQueryInfo () {
      WithdrawalService.withdrawQueryInfo({
        withdrawType: this.withdrawType
      }).then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity
          if (entity) {
            this.withdrawInfo = entity
            let bankCardType = LANG.bankCardType[entity.bankCardType] || {}
            this.withdrawInfo.bankCardTypeText = bankCardType.text
            this.withdrawInfo.blanceMoney = this.transferMoney(this.withdrawInfo.balance || 0)
            this.posList[0].body.groups[0].label = '可用余额：￥' + this.withdrawInfo.blanceMoney
          } else {
            this.$refs['tip-popup'].tip('还未绑卡，请先到钱包绑卡', 2000, () => {
              this.historyBack()
            })
          }
        } else {
          this.$refs['tip-popup'].tip(data.message, 2000, () => {
            this.historyBack()
          })
        }
      }).catch(err => {
        this.$refs['tip-popup'].tip(err.message)
      })
    },
    inputBlurEvent (e, target, value) {
      if (value && value !== '0' && value !== 0) {
        this.submitBtnStatus = false
        WithdrawalService.withdrawChargeInfo({
          amount: value,
          bankCardType: this.withdrawInfo.bankCardType,
          publicTag: this.withdrawInfo.publicTag,
          withdrawType: this.withdrawType
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.submitBtnStatus = true
            let entity = data.entity || {}
            this.withdrawChargeInfo.chargeAmount = this.transferMoney(entity.chargeAmount)
            this.withdrawChargeInfo.amount = this.transferMoney(entity.amount)
            this.withdrawChargeInfo.realAmount = this.transferMoney(entity.realAmount)
          }
        })
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
    let params = this.params()
    this.returnUrl = params.returnUrl || this.getCookie(STATUS.BUSINESSRETURNURL)
    this.withdrawType = params.withdrawType
    this.setWebSiteTitle('提现')
    this.renderNullDataset()
    this.renderTabType()
    this.withdrawQueryInfo()
  }
}
