/**
 * pos列表
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月26日11:38:11
 */

import QRCode from 'qrcodejs2'

export default {
  data () {
    return {
      datasetStore: null,
      keyUpStatus: false
    }
  },
  props: {
    // 数据集合
    dataset: { type: Array },
    onBlur: { type: Function }
  },
  components: {},
  methods: {
    createQRCode () {
      let that = this
      setTimeout(() => {
        let data = that.datasetStore
        let dataItem
        let target
        let ref
        for (let key in data) {
          dataItem = data[key]
          ref = that.$refs['qrcode-thumb-' + key]
          if (ref) {
            target = ref[0]
            if (target) {
              if (!target.getAttribute('data-qrcode')) {
                /* eslint-disable no-new */
                let res = new QRCode(target, {
                  width: 95,
                  height: 95,
                  text: dataItem.body.qrCode
                })
                if (res._oQRCode) {
                  target.setAttribute('data-qrcode', true)
                }
              }
            }
          }
        }
      }, 100)
    },
    inputBlurEvent (e) {
      let target = e.target || e.srcElement
      let value = target.value || 0
      if (this.onBlur) {
        this.onBlur(e, target, value)
      }
    },
    modelFloat2 (e, target) {
      // 清除"数字"和"."以外的字符
      target.value = target.value.replace(/[^\d.]/g, '')
      // 验证第一个字符是数字
      target.value = target.value.replace(/^\./g, '')
      // 只保留第一个, 清除多余的
      target.value = target.value.replace(/\.{2,}/g, '.')
      target.value = target.value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      target.value = target.value.replace(/^(\d+)\.(\d\d).*$/, '$1.$2')
    },
    inputKeydownEvent (e) {},
    inputKeyupEvent (e) {
      let target = e.target || e.srcElement
      let dataVerify = target.getAttribute('data-verify')
      if (dataVerify === 'float2') {
        this.modelFloat2(e, target)
      }
    },
    inputPauseEvent (e) {
      let target = e.target || e.srcElement
      let dataVerify = target.getAttribute('data-verify')
      if (dataVerify === 'float2') {
        this.modelFloat2(e, target)
      }
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.datasetStore = this.dataset || this.$store.state.PosListStore.posList
    if (!this.dataset) {
      let that = this
      that.createQRCode()
      that.$store.state.PosListStore.posStoreCallBack = function (dataset) {
        that.datasetStore = dataset || that.$store.state.PosListStore.posList
        that.createQRCode()
      }
    }
  }
}
