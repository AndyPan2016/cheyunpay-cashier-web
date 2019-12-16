/**
 * 密码框 JavaScript
 * @authors AndyPan (pye-mail@163.com)
 * @date    2019年9月17日15:52:37
 */

// let { utils } = Utils.require()

export default {
  data () {
    return {
      passwordModel: null,
      tempModel: null,
      pwdBoxGroups: null
    }
  },
  props: {
    // 密码输入框类型
    type: { type: String, default: 'number' },
    // 密码长度
    length: { type: Number, default: 6 },
    // 自动获取焦点
    autofocus: { type: Boolean, default: true },
    // 输入完成
    onComplate: { type: Function },
    // 值改变
    onChange: { type: Function },
    // 获取焦点
    onFocus: { type: Function },
    // 失去焦点
    onBlur: { type: Function }
  },
  methods: {
    keypressEvent (e) {
      if (e.key === 'e' || e.key === 'E') {
        this.tempModel = this.passwordModel
      }
    },
    keydownEvent (e) {
      let that = this
      let target = e.target || e.srcElement
      let value = target.value
      if (value.length >= 6 && e.keyCode !== 8) {
        setTimeout(() => {
          target.value = value.substring(0, 6)
          that.renderPwdToBox()
        }, 10)
        return false
      }
      setTimeout(() => {
        if (that.tempModel && that.passwordModel.length <= 6) {
          that.passwordModel = that.tempModel
          that.tempModel = null
        }
        that.renderPwdToBox()
      }, 10)
    },
    blurEvent (e) {
      let onBlur = this.onBlur
      if (onBlur) {
        setTimeout(() => {
          onBlur(e)
        }, 100)
      }
    },
    focusEvent (e) {
      let onFocus = this.onFocus
      if (onFocus) {
        onFocus(e)
      }
    },
    /**
     * 渲染密码框内容
     */
    renderPwdToBox () {
      let passwordModel = (this.passwordModel || '').toString()
      passwordModel = passwordModel.length > 6 ? passwordModel.substring(0, 6) : passwordModel
      let pwdBoxGroups = this.pwdBoxGroups
      let box
      let model
      for (let i = 0, len = pwdBoxGroups.length; i < len; i++) {
        box = pwdBoxGroups[i]
        model = passwordModel[i]
        if (box && model) {
          box.value = model
        } else {
          box.value = ''
        }
      }
      if (this.onChange) {
        this.onChange(passwordModel)
      }
      if (passwordModel.length === this.length) {
        if (this.onComplate) {
          this.onComplate(passwordModel)
        }
      }
    }
  },
  created () {},
  mounted () {
    let passwordBox = this.$refs['passwordBox']
    this.pwdBoxGroups = passwordBox.querySelectorAll('.password-box-item')
  }
}
