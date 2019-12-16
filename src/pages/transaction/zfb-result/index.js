/**
 * 支付宝结果页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日17:35:29
 */

let Froms = Components.use(Components.forms)

export default {
  data () {
    return {}
  },
  components: {
    'my-forms': Froms
  },
  methods: {},
  created () {
    this.setWebSiteTitle('交易')
  }
}
