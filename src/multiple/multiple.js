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
    selectedItems: [],
    value: "",
    stack: [],

    oldFields : []
  },

  observers: {
    "field.options": function (newVal) {
      console.log("fields "+this.data.field.key, newVal,this.data.oldFields)
      let isSame = this.isSame(newVal,this.data.oldFields)
      this.data.oldFields = newVal
      
      if (!isSame ) {
        let leafNode = this.getOnlyOneLeaf(newVal)
        if(leafNode){
          this.addItem(leafNode.value)
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
    onDeleteItem(e) {
      console.log("onDeleteItem",e)
      let value = e.currentTarget.dataset.value;
      let selectedItems = this.data.selectedItems
      for (var i = 0; i < selectedItems.length; i++) {
        if (value === selectedItems[i].value) {
          selectedItems.splice(i, 1);
          this.value = selectedItems;
          this.setData({
            selectedItems
          })
          this.triggerEvent('update', { field: this.properties.field, value: this.selectedItems })
          break;
        }
      }
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
      this.addItem(value)
    },
    addItem(value){
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
        let selectedItems = this.data.selectedItems
        for (var i = 0; i < selectedItems.length; i++) {
          if (selectedItems[i].value == value) {
            return;
          }
        }

        selectedItems.push({
          selectedOptions: selectedOptions,
          path: selectedOptions.reverse().map(v => v.text).join("/"),
          value: value
        });
        
        this.setData({
          selectedItems
        })

        this.triggerEvent('update', { field: this.properties.field, value: selectedItems })
      }
    },
    setValue(values) {
      if(!values)return
      values.forEach(v=>{
        this.addItem(v)
      })
    },
    pass(){}
  }
})
