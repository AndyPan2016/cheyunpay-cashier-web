/**
 * Layout 充值
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日21:11:50
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesRecharge.index
      this.currentComponent = PagesRecharge.use(page)
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
