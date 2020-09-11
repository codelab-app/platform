import { ReactNodeI } from '@codelab/shared/interface/node'
import { Cascader } from './Cascader.types'

export const cascaderData: ReactNodeI<Cascader.Props> = {
  type: 'Cascader',
  nodeType: 'React',
  props: {
    options: [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ],
    placeholder: 'Please select',
  },
}
