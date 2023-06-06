Page({
  data: {
    fields: [{
      label: '文本输入1',
      key: 'wbsr1',
      type: 'text',
      required: false,
    },
    {
      label: '身份证号',
      key: 'sfz',
      keyboard: 'idcard',
      type: 'text',
      required: false,
    },
    {
      label: '车牌输入',
      placeholder: '自定义的placeholder',
      key: 'carplate',
      type: 'carplate',
      required: false,
      readonly: false,
    },
    {
      label: '签名确认',
      placeholder: '请签名确认',
      key: 'handwriter',
      type: 'handwriter',
      required: false,
      readonly: false,
    },

    {
      label: '只读模式',
      default: '非必填项',
      key: 'zdms',
      type: 'text',
      required: false,
      readonly: true,
    },
    {
      label: '开关',
      key: 'switch',
      type: 'switch',
      required: false,
      readonly: false,
    },
    {
      label: '图片上传',
      placeholder: '图片上传示例',
      key: 'upload',
      type: 'upload',
      required: false,
      readonly: false,
    },
    {
      label: '选取输入项',
      key: 'pick',
      type: 'cascader',
      required: true,
      options: [{
        text: '月薪3000元以下',
        value: '1'
      },
      {
        text: '月薪3000元~5000元',
        value: '2'
      },
      {
        text: '月薪5000元~10000元',
        value: '3'
      },
      {
        text: '月薪10000元~15000元',
        value: '4'
      },
      {
        text: '月薪15000元~20000元',
        value: '5'
      },
      {
        text: '月薪20000以上',
        value: '6'
      },
      ],
    },
    {
      label: '多选',
      key: 'multiplepick',
      type: 'multiple',
      required: false,
      options: [{
        text: '矿石',
        children: [{
          text: '金矿',
          value: '1'
        },
        ]
      },
      {
        text: '煤矿',
        value: '2'
      },
      {
        text: '石头',
        value: '3'
      },
      ],
    },
    {
      label: '只读下拉框',
      key: 'pick1',
      type: 'cascader',
      required: true,
      readonly: true,
      options: [{
        text: '月薪3000元以下',
        value: '1'
      },
      {
        text: '月薪3000元~5000元',
        value: '2'
      },
      {
        text: '月薪5000元~10000元',
        value: '3'
      },
      {
        text: '月薪10000元~15000元',
        value: '4'
      },
      {
        text: '月薪15000元~20000元',
        value: '5'
      },
      {
        text: '月薪20000以上',
        value: '6'
      },
      ],
    },
    {
      label: '系统角色',
      placeholder: '异步加载选项的示例',
      key: 'pick2',
      type: 'cascader',
      required: true,
      options: [],
    },
    {
      label: '多级选择',
      key: 'pick3',
      type: 'cascader',
      required: true,
      options: [{
        text: '湖北省',
        value: '1',
        children: [{
          text: '武汉市',
          value: '1'
        },
        {
          text: '宜昌市',
          value: '2',
          children: [{
            text: '宜昌县',
            value: '1'
          },
          {
            text: '远安县',
            value: '2'
          },
          {
            text: '秭归县',
            value: '3'
          },
          {
            text: '兴山县',
            value: '4'
          },
          {
            text: '五峰土家族自治县',
            value: '5'
          },
          {
            text: '长阳土家族自治县',
            value: '6'
          }
          ]
        },
        ]
      },
      {
        text: '湖南省',
        value: '2'
      },
      ],
    },
    ],
  }
})
