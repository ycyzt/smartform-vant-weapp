// components/smartform/switch/switch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    field: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    value:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onUpdate(e) {
      console.log(e)
      this.setData({ value: e.detail });
      this.triggerEvent('update', {field:this.properties.field,value:e.detail})
    },
    setValue(value){
      this.triggerEvent('update', {field:this.properties.field,value:value})
      this.setData({
        value:value
      })
    }
  }
})
