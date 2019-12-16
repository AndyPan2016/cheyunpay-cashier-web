/**
 * 注册
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月3日11:22:25
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
let { TransferAccountsService } = Services.require()

export default {
  data () {
    return {
      transferHisQueryVos: null
    }
  },
  components: {
    'my-forms': Forms
  },
  methods: {
    formClick (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'j-item-mask')) {
        let dataId = target.getAttribute('data-id')
        let query
        utils.forEach(this.transferHisQueryVos, item => {
          if (item.payeeUserNo === dataId) {
            query = item
            return 'break'
          }
        })
        this.routeTo(PagesTransferAccounts.router(PagesTransferAccounts.transferAccount), {
          query
        })
      }
    },
    transferHisQuery () {
      TransferAccountsService.transferHisQuery().then(res => {
        let data = res.data
        if (data.success) {
          let entity = data.entity || {}
          this.transferHisQueryVos = entity.transferHisQueryVos || []
        }
      })
    }
  },
  created () {
    this.setWebSiteTitle('选择历史收款人')
    this.transferHisQuery()
  }
}
