/**
 * 流程状态
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月19日15:28:30
 */

let Form = Components.use(Components.forms)
let AD = PagesCommons.use(PagesCommons.ad)
let { utils } = Utils.require()

export default {
  data () {
    return {
      processStatusButtons: this.$store.state.ProcessStatusStore.buttons,
      processStatusForms: this.$store.state.ProcessStatusStore.forms,
      adStatus: this.$store.state.ProcessStatusStore.ad,
      adModel: this.$store.state.ProcessStatusStore.adModel,
      adList: null
    }
  },
  components: {
    'ad-list': AD,
    'process-status-form': Form
  },
  methods: {
    /**
     * 流程状态页面按钮点击事件
     * @param {Event} e 点击事件对象
     */
    buttonsClickEvent (e) {
      let target = e.target || e.srcElement
      if (utils.hasClass(target, 'ui-button')) {
        let dataKey = target.getAttribute('data-key')
        let buttonItemFn = (this.processStatusButtons[dataKey] || {}).fn
        if (buttonItemFn) {
          buttonItemFn.call(target, e)
        }
      }
    }
  },
  created () {
    if (this.$store.state.ProcessStatusStore.title !== false) {
      this.setWebSiteTitle(this.$store.state.ProcessStatusStore.title)
    }
    if (typeof (this.adStatus) === 'object') {
      this.adList = this.adStatus
    }
  }
}
