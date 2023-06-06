import Signature from 'mini-smooth-signature';
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
    width1: 400,
    height1: 200,
    scale: 2,
  },
  lifetimes: {
    attached: function () {
      this.initSignature1()
    },
  },
  methods: {
    showPopup() {
      if (this.properties.field.readonly) {
        return
      }
      this.setData({ showpop: true });
      this.triggerEvent('popup', { field: this.properties.field, value: true })
    },
    hidePopup() {
      this.setData({ showpop: false });
      this.triggerEvent('popup', { field: this.properties.field, value: false })
    },
    // 样例1初始化
    initSignature1() {
      this.createSelectorQuery().select('#canvas').fields({ node: true, size: true }).exec((res) => {
        console.log(res)
        const canvas = res[0].node;
        canvas.width = this.data.width1 * this.data.scale;
        canvas.height = this.data.height1 * this.data.scale;
        const ctx = canvas.getContext('2d');
        this.signature1 = new Signature(ctx, {
          width: this.data.width1,
          height: this.data.height1,
          scale: this.data.scale,
          bgColor: '#eeeeee',
          toDataURL: (type, quality) => canvas.toDataURL(type, quality),
          requestAnimationFrame: (fn) => canvas.requestAnimationFrame(fn),
          getImagePath: () => new Promise((resolve, reject) => {
            const img = canvas.createImage();
            img.onerror = reject;
            img.onload = () => resolve(img);
            img.src = canvas.toDataURL();
          })
        })
      })
    },

    handleTouchStart1(e) {
      const pos = e.touches[0];
      this.signature1.onDrawStart(pos.x, pos.y);
    },
    handleTouchMove1(e) {
      const pos = e.touches[0];
      this.signature1.onDrawMove(pos.x, pos.y);
    },
    handleTouchEnd1() {
      this.signature1.onDrawEnd();
    },
  
    /**
     * 样例1按钮事件
     */
    
     onConfirm(){
      if (this.signature1.isEmpty()) {
        this.setValue("")
      }else{
        const dataURL = this.signature1.toDataURL();
        this.setValue(dataURL)
      }
      this.hidePopup()
    },
    setValue(value) {
      this.setData({
        value: value
      })
      this.triggerEvent('update', { field: this.properties.field, value: value })
    },
    handleClear1() {
      this.signature1.clear();
    },
    handleUndo1() {
      this.signature1.undo();
    },
    handleColor1() {
      this.signature1.color = '#' + Math.random().toString(16).slice(-6);
    },
    
  }
});