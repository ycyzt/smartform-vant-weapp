Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    button: {
      type: String,
      value: ''
    },
    fields: {
      type: Array,
      value: '',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    values: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setValues(values) {
      // console.log("setValues",values)
      for (var key in values) {
        let component = this.selectComponent("#" + key)
        if (component) {
          component.setValue(values[key])
        }
      }
    },
    getValues() {
      return this.data.values
    },
    onClick(e) {
      // console.log(e)
      if (this.validate()) {
        // 深拷贝 this.data.values
        let values = JSON.parse(JSON.stringify(this.data.values))
        this.triggerEvent('submit', values)
      }
    },
    onUpdate(e) {
      let { field, value } = e.detail
      this.data.values[field.key] = value
      this.triggerEvent('update', e.detail)
    },
    validate() {
      let { fields } = this.properties
      let { values } = this.data
      let flag = true
      for (var i = 0; i < fields.length; i++) {
        let field = fields[i]

        console.log(field.key, "values", values[field.key])
        if (field.required && !field.hide && field.type != "switch" && !values[field.key]) {
          flag = false
          wx.showToast({
            title: '请输入 ' + field.label,
            icon: 'none',
            duration: 2000
          })
          break
        }
      }
      return flag
    },
    onPopup(e) {
      this.triggerEvent('popup', e.detail.value)
    }
  }
})
