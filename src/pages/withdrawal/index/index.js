/**
 * 提现
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日20:37:06
 */

let Form = Components.use(Components.forms)
// let { STATUS } = Configs.require()

export default {
  data () {
    return {
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-standard-withdrawal', text: '标准提现', key: 'standard', type: 'default'},
          {icon: 'icon-entrust-withdrawal', text: '委托提现', key: 'entrust', type: 'default'}
        ]
      ],
      returnUrl: null
    }
  },
  components: {
    'withdrawal-form': Form
  },
  methods: {
    /**
     * 表单点击事件
     * @param {Event} e 事件对象
     * @param {DOMElement} target 点击目标元素对象
     * @param {String} key 点击元素的key值
     */
    formClick (e, target, key) {
      if (key === 'standard') {
        // 标准提现
        this.routeTo(PagesWithdrawal.router(PagesWithdrawal.withdrawalPay), {
          query: {
            withdrawType: 'WITHDRAW_STANDARD',
            returnUrl: this.returnUrl
          }
        })
      } else if (key === 'entrust') {
        // 委托提现
        this.routeTo(PagesWithdrawal.router(PagesWithdrawal.withdrawalPay), {
          query: {
            withdrawType: 'WITHDRAW_ENTRUST',
            returnUrl: this.returnUrl
          }
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('提现')
    let params = this.params()
    this.returnUrl = params.returnUrl
  }
}
