/**
 * 中转页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:16:53
 */

let Popup = Components.use(Components.popup)
let { CommonService, OneCodePayService } = Services.require()
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      code: null,
      testTxt: null
    }
  },
  components: {
    'tip-popup': Popup
  },
  methods: {
    transferSuccess (res, success) {
      let data = res.data || {}
      if (data.success) {
        if (success) {
          success(data)
        }
      } else {
        this.$refs['tip-popup'].tip(data.message)
      }
    },
    renderOneCodePay () {
      let code = this.code
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
      if (code) {
        OneCodePayService.aggregatePayConfirm({
          code,
          tradePayType: tradePayType
        }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let payInfo = data.entity.payInfo
            let placeCardPay = this.getLocalStorage('PLACE_CARD_PAY')
            let toQRCodeCollection = () => {
              let params = this.transfToJson(this.getLocalStorage('QRCodeCollectionReturn')) || {}
              let returnUrl = this.getLocalStorage('QRCodeCollectionReturnUrl')
              if (returnUrl) {
                params.returnUrl = returnUrl
              }
              this.routeTo(PagesQRCodeCollection.router(), {
                query: params
              })
            }
            let aliPayResult = (resultCode) => {
              let resultConfig = {
                '99': { msg: '已退出支付', type: 'fail', buttonText: '返回' },
                '4000': { msg: '支付失败', type: 'fail', buttonText: '返回' },
                '6001': { msg: '支付已取消', type: 'fail', buttonText: '返回' },
                '6002': { msg: '网络出错', type: 'fail', buttonText: '返回' },
                '6004': { msg: '支付过程中网络出错', type: 'fail', buttonText: '返回' },
                '7001': { msg: '已中止快捷支付', type: 'fail', buttonText: '返回' },
                '8000': { msg: '支付超时', type: 'fail', buttonText: '返回' },
                '9000': { msg: '支付成功', type: 'success', buttonText: '完成' }
              }
              let result = resultConfig[resultCode] || resultConfig['4000']

              this.$store.dispatch('processStatusStoreUpdate', {
                // 标题
                title: result.msg,
                // 状态
                status: result.type,
                // 结果
                result: result.msg,
                // 备注
                remark: null,
                // 按钮
                buttons: [
                  {
                    text: result.buttonText,
                    class: null,
                    fn: () => {
                      // 完成
                      toQRCodeCollection()
                    }
                  }
                ]
              })
              if (placeCardPay) {
                // 去公共流程状态页
                this.routeTo(PagesCommons.router(PagesCommons.processStatus))
              }
            }
            if (tradePayType === 'TRADE_PAY_WEIXIN') {
              // 微信
              let payInfoJSON = this.transfToJson(payInfo)
              let wxSign = {
                // 公众号名称，由商户传入
                appId: payInfoJSON.jsAppId,
                // 时间戳，自1970年以来的秒数
                timeStamp: payInfoJSON.jsTimeStamp,
                // 随机串
                nonceStr: payInfoJSON.jsNonceStr,
                package: payInfoJSON.jsPackage,
                // 微信签名方式
                signType: payInfoJSON.signType,
                // 微信签名
                paySign: payInfoJSON.sign
              }
              let onBridgeReady = () => {
                WeixinJSBridge.invoke('getBrandWCPayRequest', wxSign, (res) => {
                  if (res.err_msg === 'get_brand_wcpay_request:ok') {
                    // 支付成功
                    // this.$refs['tip-popup'].tip('支付成功')
                    this.$store.dispatch('processStatusStoreUpdate', {
                      // 标题
                      title: '支付成功',
                      // 状态
                      status: 'success',
                      // 结果
                      result: '支付成功',
                      // 备注
                      remark: null,
                      // 按钮
                      buttons: [
                        {
                          text: '完成',
                          class: null,
                          fn: () => {
                            // 完成
                            toQRCodeCollection()
                          }
                        }
                      ]
                    })
                  } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                    // 支付取消
                    // this.$refs['tip-popup'].tip('支付已取消')
                    this.$store.dispatch('processStatusStoreUpdate', {
                      // 标题
                      title: '支付已取消',
                      // 状态
                      status: 'fail',
                      // 结果
                      result: '支付已取消',
                      // 备注
                      remark: null,
                      // 按钮
                      buttons: [
                        {
                          text: '返回',
                          class: null,
                          fn: () => {
                            // 完成
                            toQRCodeCollection()
                          }
                        }
                      ]
                    })
                  } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                    // 支付失败
                    // this.$refs['tip-popup'].tip('支付失败:' + res.err_code + res.err_desc + res.err_msg)
                    this.$store.dispatch('processStatusStoreUpdate', {
                      // 标题
                      title: '支付失败',
                      // 状态
                      status: 'fail',
                      // 结果
                      result: '支付失败',
                      // 备注
                      remark: res.err_desc,
                      // 按钮
                      buttons: [
                        {
                          text: '返回',
                          class: null,
                          fn: () => {
                            // 完成
                            toQRCodeCollection()
                          }
                        }
                      ]
                    })
                  }
                  if (placeCardPay) {
                    // 去公共流程状态页
                    this.routeTo(PagesCommons.router(PagesCommons.processStatus))
                  }
                })
              }
              if (typeof WeixinJSBridge === 'undefined') {
                if (document.addEventListener) {
                  document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
                } else if (document.attachEvent) {
                  document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
                  document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
                }
              } else {
                onBridgeReady()
              }
            } else if (tradePayType === 'TRADE_PAY_ALI') {
              // 支付宝
              let aliPay = () => {
                AlipayJSBridge.call('tradePay', {
                  tradeNO: payInfo
                }, function (data) {
                  aliPayResult(data.resultCode)
                  // if (resultCode === '9000') {
                  //   AlipayJSBridge.call('toast', {
                  //     content: '支付成功',
                  //     type: 'success',
                  //     duration: 2000
                  //   }, function () {
                  //     toQRCodeCollection()
                  //   })
                  // } else if (resultCode === '6001') {
                  //   AlipayJSBridge.call('toast', {
                  //     content: '支付已取消',
                  //     type: 'fail',
                  //     duration: 2000
                  //   }, function () {
                  //     toQRCodeCollection()
                  //   })
                  // } else {
                  //   AlipayJSBridge.call('toast', {
                  //     content: '支付失败',
                  //     type: 'fail',
                  //     duration: 2000
                  //   }, function () {
                  //     toQRCodeCollection()
                  //   })
                  // }
                })
              }
              if (window.AlipayJSBridge) {
                aliPay && aliPay()
              } else {
                document.addEventListener('AlipayJSBridgeReady', aliPay, false)
              }
            }
          }
        })
      }
    },
    // /**
    //  * 设置是否已经进入过收银台内部页面
    //  */
    // setEntrtyInsidePage () {
    //   this.setCookie(STATUS.ISENTRTYINSIDEPAGE, true)
    // },
    /**
     * 中转验证
     * @remark: ONE_CODE_PAY: 一码付
     *  PLACE_CARD_PAY: 摆牌
     *  RECHARGE: 充值
     *  TRADE_PAY: 交易支付
     *  TRANSFER_ACCOUNT: 转账
     *  WITHDRAW: 提现
     */
    transferAuth () {
      this.$refs['tip-popup'].loading('loading...')
      let query = window.location.href.split('index?')[1]
      let params = this.params()
      let paramsCode = params.auth_code || params.code
      if (paramsCode) {
        this.code = paramsCode
        this.renderOneCodePay()
        return
      } else {
        // 加'#'模式可能导致返回code参数夹在了/#/前面，需手动解析url地址
        let url = window.location.href
        if (url.indexOf('code=')) {
          let urlSplit1 = url.split('code=')
          if (urlSplit1.length > 1) {
            let urlSplit2 = urlSplit1[1].split('&')
            this.code = urlSplit2[0]
            if (this.code) {
              this.renderOneCodePay()
              return
            } else {
              this.$refs['tip-popup'].tip('授权失败')
            }
          }
        }
      }
      let body = params.body
      let bodyJson = this.transfToJson(unescape(body))
      let sign = params['x-api-sign'] || params['sign']
      let signType = params['x-api-signType'] || params['signType']
      let gid = params.gid
      let partnerId = bodyJson.partnerId
      let sceneType = bodyJson.sceneType
      if (partnerId) {
        this.setCookie(STATUS.PARTNERID, partnerId)
      }

      if (sceneType === 'WITHDRAW') {
        // 去提现
        // CommonService.authWithdrawRedirect({ body, gid, sign, signType }).then(res => {
        CommonService.authWithdrawRedirect(query).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let hasLoginInfo = entity.hasLoginInfo
            let mobileNo = entity.mobileNo
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            if (hasLoginInfo === 'NO') {
              this.setEntrtyInsidePage()
              // 未设置登录信息(登录密码、支付密码)
              this.routeTo(PagesWithdrawal.router(PagesWithdrawal.setLoginInfo), {
                query: { returnUrl, mobileNo, sceneType }
              })
            } else {
              this.setEntrtyInsidePage()
              // 设置了，去提现页面
              this.routeTo(PagesWithdrawal.router(), {
                query: { returnUrl }
              })
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (sceneType === 'TRANSFER_ACCOUNT') {
        // 转账
        // CommonService.authTransferAccountRedirect({ body, gid, sign, signType }).then(res => {
        CommonService.authTransferAccountRedirect(query).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let hasLoginInfo = entity.hasLoginInfo
            let mobileNo = entity.mobileNo
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            if (hasLoginInfo === 'NO') {
              this.setEntrtyInsidePage()
              // 未设置登录信息(登录密码、支付密码)
              this.routeTo(PagesWithdrawal.router(PagesWithdrawal.setLoginInfo), {
                query: { returnUrl, mobileNo, sceneType }
              })
            } else {
              this.setEntrtyInsidePage()
              // 设置了，去转账页面
              this.routeTo(PagesTransferAccounts.router(), {
                query: { returnUrl }
              })
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (sceneType === 'TRADE_PAY') {
        // 交易支付
        // CommonService.authTradePayRedirect({ body, gid, sign, signType }).then(res => {
        CommonService.authTradePayRedirect(query).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let hasLoginInfo = entity.hasLoginInfo
            let mobileNo = entity.mobileNo
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            let transactionPayStore = {
              goodsName: entity.goodsName,
              merchOrderNo: entity.merchOrderNo,
              recAccountName: entity.recAccountName,
              recAccountNo: entity.recAccountNo,
              amount: entity.amount,
              mobileNo: mobileNo
            }
            this.setLocalStorage(STATUS.TRANSACTIONPAYSTORE, JSON.stringify(transactionPayStore))
            if (hasLoginInfo === 'NO') {
              this.setEntrtyInsidePage()
              // 未设置登录信息(登录密码、支付密码)
              this.routeTo(PagesWithdrawal.router(PagesWithdrawal.setLoginInfo), {
                query: { returnUrl, mobileNo, sceneType }
              })
            } else {
              this.setEntrtyInsidePage()
              // 设置了，去交易支付
              this.routeTo(PagesTransaction.router(), {
                query: { returnUrl }
              })
            }
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (sceneType === 'RECHARGE') {
        // 充值
        CommonService.authRechargeRedirect(query).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            this.setEntrtyInsidePage()
            this.routeTo(PagesRecharge.router(), {
              query: { returnUrl }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (sceneType === 'PLACE_CARD_PAY') {
        // 摆牌
        CommonService.authPlaceCardPayRedirect({ body, gid, sign, signType }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            this.setLocalStorage('QRCodeCollectionReturn', JSON.stringify({shopName: entity.shopName, barcodeNo: entity.barcodeNo}))
            this.setLocalStorage('QRCodeCollectionReturnUrl', returnUrl)
            this.setLocalStorage('PLACE_CARD_PAY', true)
            // this.setEntrtyInsidePage()
            this.routeTo(PagesQRCodeCollection.router(), {
              query: {
                shopName: entity.shopName,
                barcodeNo: entity.barcodeNo,
                returnUrl: returnUrl
              }
            })
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else if (sceneType === 'ONE_CODE_PAY') {
        // 一码付
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
        CommonService.authOneCodePayRedirect({ body, gid, sign, signType, tradePayType }).then(res => {
          let data = res.data
          if (data.success) {
            this.$refs['tip-popup'].close()
            let entity = data.entity
            let returnUrl = entity.returnUrl
            if (returnUrl) {
              this.setCookie(STATUS.BUSINESSRETURNURL, returnUrl)
            }
            this.setLocalStorage('PLACE_CARD_PAY', '')
            // 支付宝服务窗跳转url或者微信授权url
            let redirectUrl = entity.redirectUrl
            // this.setEntrtyInsidePage()
            this.openHref(redirectUrl)
          } else {
            this.$refs['tip-popup'].tip(data.message)
          }
        }).catch(err => {
          this.$refs['tip-popup'].tip(err.message)
        })
      } else {
        this.$refs['tip-popup'].tip('系统异常，请稍后再试')
      }
    }
  },
  created () {},
  mounted () {
    // let params = this.params()
    // alert(JSON.stringify(params))
    // let isEntrtyInsidePage = this.getCookie(STATUS.ISENTRTYINSIDEPAGE)
    let recordEntrtyInsidepage = window.recordEntrtyInsidepage
    // if ((isEntrtyInsidePage === true || isEntrtyInsidePage === 'true') || (recordEntrtyInsidepage === true || recordEntrtyInsidepage === 'true')) {
    if ((recordEntrtyInsidepage === true || recordEntrtyInsidepage === 'true')) {
      // 如果已经进入过，当后退到当前页面，删除进入记录，继续返回到上一页
      this.delCookie(STATUS.ISENTRTYINSIDEPAGE)
      window.recordEntrtyInsidepage = undefined
      this.historyBack(-2)
    } else {
      this.transferAuth()
    }
    // this.transferAuth()
  }
}
