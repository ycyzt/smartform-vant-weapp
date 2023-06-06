// components/smartform/input/input.js
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
    value: ''
  },

  attached(){
    this.setData({
      value: this.properties.field.default?this.properties.field.default:''
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onUpdate(e) {
      console.log(e)
      this.triggerEvent('update', {field:this.properties.field,value:e.detail})
    },
    setValue(value){
      // if(value==this.data.value)return
      this.triggerEvent('update', {field:this.properties.field,value:value})
      this.setData({
        value:value
      })
    }
  }
})
