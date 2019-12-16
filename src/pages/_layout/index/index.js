/**
 * 首页业务逻辑
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年8月21日13:53:08
 */

let Forms = Components.use(Components.forms)
let { utils } = Utils.require()
// let { PosService } = Services.require()

let render = {
  data () {
    return {
      routeOptions: []
    }
  },
  methods: {
    pageClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'form-item-lab')) {
        let route = target.getAttribute('data-route')
        let page = target.getAttribute('data-page')
        let key = target.getAttribute('data-key')
        let filekey = target.getAttribute('data-filekey')

        let query
        let params
        if (key) {
          let temp = window[key]
          if (temp) {
            let fileConfig = (temp.fileName[filekey] || {})
            query = fileConfig.query
            params = fileConfig.params
          }
        }
        if (route) {
          let routeParams = { query, params }
          this.routeTo(route.replace(':page', page), routeParams)
        }
      }
    }
  },
  components: {
    'form-list': Forms
  },
  created () {
    this.delEntrtyInsidePage()
    // this.routeOptions = this.$router.options.routes
    // let href = window.location.href
    // let hrefParams = href.split('?')[1]
    // if (hrefParams) {
    //   this.routeTo(PagesTransfer.router(), {
    //     query: this.params()
    //   })
    // }
  }
}

export {
  render
}
