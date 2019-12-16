/**
 * 充值
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日21:15:24
 */

let Form = Components.use(Components.forms)
// let { STATUS } = Configs.require()

export default {
  data () {
    return {
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-offline-recharge', text: '线下充值', key: 'recharge', type: 'default'}
        ]
      ],
      returnUrl: null
    }
  },
  components: {
    'recharge-form': Form
  },
  methods: {
    /**
     * 表单点击事件
     * @param {Event} e 事件对象
     * @param {DOMElement} target 点击目标元素对象
     * @param {String} key 点击元素的key值
     */
    formClick (e, target, key) {
      if (key === 'recharge') {
        // 线下提现
        this.routeTo(PagesRecharge.router(PagesRecharge.offlineRecharge), {
          query: {
            returnUrl: this.returnUrl
          }
        })
      }
    }
  },
  created () {
    this.setWebSiteTitle('充值')
    this.returnUrl = this.params('returnUrl')
  }
}
