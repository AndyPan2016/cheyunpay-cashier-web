/**
 * Layout 提现
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月10日20:35:59
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesWithdrawal.index
      this.currentComponent = PagesWithdrawal.use(page)
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
