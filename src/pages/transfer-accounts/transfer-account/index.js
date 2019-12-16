/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let Popup = Components.use(Components.popup)
let AD = PagesCommons.use(PagesCommons.ad)

export default {
  data () {
    return {
      formData: {
        memberName: null,
        memberId: null
      }
    }
  },
  components: {
    'ad-list': AD,
    'my-forms': Forms,
    'tip-popup': Popup
  },
  methods: {
    verifyFailureEvent (verifyValue, result, target) {},
    formVerifySuccessEvent (myFormData) {
      // console.info(myFormData)
      this.routeTo(PagesTransferAccounts.router(PagesTransferAccounts.transferAccountPay), {
        query: this.formData
      })
    },
    toChooseHistory () {
      this.routeTo(PagesTransferAccounts.router(PagesTransferAccounts.transferHistoryMember))
    }
  },
  created () {
    this.setWebSiteTitle('转账到余额账户')
    let params = this.params()
    this.formData.memberId = params.payeeUserNo || null
    this.formData.memberName = params.payeeUserName || null
  }
}
