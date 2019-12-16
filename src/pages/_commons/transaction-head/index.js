/**
 * 交易头部
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日11:08:01
 */

let PosListItem = PagesCommons.use(PagesCommons.posListItem)
let { STATUS } = Configs.require()

export default {
  data () {
    return {
      headData: [
        {
          head: { text: '订单号：', fontSize: 'font-24', icon: 'icon-transaction-right' },
          body: {
            type: 'list',
            groups: [
              { label: '交易金额', text: '￥0', itemClass: 'transaction-money' },
              { label: '商品', text: '', itemClass: 'transaction-default' },
              { label: '收款方', text: '', itemClass: 'transaction-default' }
            ]
          }
        }
      ]
    }
  },
  props: {},
  components: {
    'pos-record-detail': PosListItem
  },
  methods: {
  },
  created () {
    let transactionPayStore = this.transfToJson(this.getLocalStorage(STATUS.TRANSACTIONPAYSTORE))
    this.headData[0].head.text = '订单号：' + (transactionPayStore.merchOrderNo || '')
    this.headData[0].body.groups[0].text = '￥' + this.transferMoney(transactionPayStore.amount)
    this.headData[0].body.groups[1].text = transactionPayStore.goodsName
    this.headData[0].body.groups[2].text = transactionPayStore.recAccountName
  }
}
