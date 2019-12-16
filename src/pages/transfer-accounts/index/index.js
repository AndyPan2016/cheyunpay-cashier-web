/**
 * 转账
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日15:26:22
 */

let Form = Components.use(Components.forms)
// let { STATUS } = Configs.require()

export default {
  data () {
    return {
      // 表单数据集
      formsDataset: [
        [
          {icon: 'icon-to-bank', text: '转账到余额账户', key: 'toyue', type: 'default'}
          // {icon: 'icon-to-bank', text: '转账到银行账户', key: 'tobank', type: 'default'}
        ]
      ]
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
      if (key === 'toyue') {
        // 转账到余额账户
        this.routeTo(PagesTransferAccounts.router(PagesTransferAccounts.transferAccount))
      }
    }
  },
  created () {
    this.setWebSiteTitle('转账')
  }
}
