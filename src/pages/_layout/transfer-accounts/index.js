/**
 * Layout 转账首页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日15:21:05
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesTransferAccounts.index
      this.currentComponent = PagesTransferAccounts.use(page)
    }
  },
  components: {},
  watch: {
    '$route' () {
      this.renderComponent()
    }
  },
  created () {
    this.renderComponent()
  }
}
