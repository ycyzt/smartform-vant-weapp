// components/smartform/cascader/cascader.js
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
    showpop: false,
    fieldValue: "",
    selectedOptions: [],
    value: "",
    oldFields : []
  },

  observers: {
    "field.options": function (newVal) {
      // console.log("fields "+this.data.field.key, newVal,this.data.oldFields)
      let isSame = this.isSame(newVal,this.data.oldFields)
      this.data.oldFields = newVal
      
      if (!isSame ) {
        let leafNode = this.getOnlyOneLeaf(newVal)
        if(leafNode){
          this.setValue(leafNode.value)
        }else{
          // 刷新列表选项后。重新设置选中值
          this.setValue()
        }
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getOnlyOneLeaf(options){
      let findLeaf = (options) => {
        if(options.length!=1)
        {
          return false
        }
        if(options[0].children&&options[0].children.length>0){
          return findLeaf(options[0].children)
        }else{
          return options[0]
        }
      }
      return findLeaf(options)
    },
    isSame(arr1,arr2){
      if(arr1.length != arr2.length){
        return false
      }
      for(let i=0;i<arr1.length;i++){
        if(arr1[i].value != arr2[i].value||arr1[i].text != arr2[i].text){
          return false
        }
        if(arr1[i].children && arr2[i].children){
          if(!this.isSame(arr1[i].children,arr2[i].children)){
            return false
          }
        }
      }
      return true
    },
    showPopup() {
      if (this.properties.field.readonly) {
        return
      }
      this.setData({ showpop: true });
    },
    hidePopup() {
      this.setData({ showpop: false });
    },
    onFinish(e) {
      const { selectedOptions, value } = JSON.parse(JSON.stringify(e.detail));
      this.setData({
        showpop: false,
      })
      this.setValue(value)
    },
    setValue(value) {
      if (!value) {
        value = this.data.value
      }
      // 深度优先遍历 field.options 找到value 与 option.value 相等的option
      let options = this.properties.field.options
      let selectedOptions = []
      let selectedValue = []
      let findOption = (options, value) => {
        for (let i = 0; i < options.length; i++) {
          if (options[i].value == value) {
            selectedOptions.push(options[i])
            selectedValue.push(options[i].value)
            return true
          } else if (options[i].children) {
            if (findOption(options[i].children, value)) {
              selectedOptions.push(options[i])
              selectedValue.push(options[i].value)
              return true
            }
          }
        }
        return false
      }
      let result = findOption(options, value)
      // console.log("selectedOptions:",selectedOptions)
      // console.log("selectedValue:",selectedValue)
      if (result) {
        const fieldValue = selectedOptions
          .map((option) => option.text || option.name)
          .join('/');
        this.setData({
          fieldValue,
          selectedOptions: selectedValue,
          value: value,
        })

        this.triggerEvent('update', { field: this.properties.field, value: selectedOptions })
      }else{
        this.setData({
          fieldValue:"",
          selectedOptions: [],
          value: "",
        })
        this.triggerEvent('update', { field: this.properties.field, value: [] })
      }
    }
  }
})
