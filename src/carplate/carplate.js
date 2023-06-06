Component({
  externalClasses: ['carplate'],
  properties: {
    field: {
      type: Object,
      value: {}
    },
  },
  data: {
    showpop: false,
    curindex: 0,
    value: "",
    fieldValue: "_______",
    curpos: 0,
    keyVehicle1: '陕京津沪冀豫云辽',
    keyVehicle2: '黑湘皖鲁新苏浙赣',
    keyVehicle3: '鄂桂甘晋蒙吉闽贵',
    keyVehicle4: '粤川青藏琼宁渝',
    keyNumber: '1234567890',
    keyEnInput1: 'QWERTYUIOP',
    keyEnInput2: 'ASDFGHJKL',
    keyEnInput3: 'ZXCVBNM',
  },
  methods: {
    showPopup() {
      if (this.properties.field.readonly) {
        return
      }
      this.setData({ showpop: true });
    },
    hidePopup() {
      this.setData({ showpop: false });
    },
    setValue(value) {
      let vlen = value.length
      if(vlen > 7){
        value = value.substring(0,7)
      }
      this.setData({
        value: value,
        fieldValue: value + "_".repeat(Math.max(7 - vlen,0)),
      })
      this.triggerEvent('update', { field: this.properties.field, value: this.data.value })

    },
    onClick(e) {
      this.setData({
        curindex: e.target.dataset.value
      })
    },
    vehicleTap: function (event) {
      let val = event.target.dataset.value;
      switch (val) {
        case 'delete':
          this.data.fieldValue = this.replaceString(this.data.fieldValue, this.data.curindex, '_')
          this.data.curindex > 0 ? this.data.curindex-- : 1
          this.setData({
            curindex: this.data.curindex,
            fieldValue: this.data.fieldValue,
            value: this.data.fieldValue.replace(/_/g, '')
          })
          this.triggerEvent('update', { field: this.properties.field, value: this.data.value })
          break;
        case 'ok':
          this.setData({
            showpop: false
          })
          break;
        default:
          this.data.fieldValue = this.replaceString(this.data.fieldValue, this.data.curindex, val)
          if (this.data.curindex == 6) {
            this.setData({
              showpop: false
            })
          }
          this.data.curindex < 6 ? this.data.curindex++ : 1
          this.setData({
            curindex: this.data.curindex,
            fieldValue: this.data.fieldValue,
            value: this.data.fieldValue.replace(/_/g, '')
          })
          this.triggerEvent('update', { field: this.properties.field, value: this.data.value })
      }
    },
    replaceString(str, index, c) {
      let arr = str.split('');
      arr[index] = c;
      return arr.join('');
    }
  }
});