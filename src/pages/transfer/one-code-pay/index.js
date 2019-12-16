/**
 * 一码付中转页
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日22:16:53
 */

let Popup = Components.use(Components.popup)
// let { CommonService } = Services.require()
// let { STATUS } = Configs.require()

export default {
  data () {
    return {
      code: null
    }
  },
  components: {
    'tip-popup': Popup
  },
  methods: {},
  created () {
    this.setWebSiteTitle('一码付')
    let params = this.params()
    this.code = params.code
  }
}
