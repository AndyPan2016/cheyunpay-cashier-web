/**
 * Layout 交易
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月11日10:29:12
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesTransaction.index
      this.currentComponent = PagesTransaction.use(page)
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
