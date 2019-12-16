/**
 * Layout 二维码收款
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年10月9日22:05:50
 */

export default {
  data () {
    return {
      currentComponent: null
    }
  },
  methods: {
    renderComponent () {
      let page = this.params('page') || PagesQRCodeCollection.index
      this.currentComponent = PagesQRCodeCollection.use(page)
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
