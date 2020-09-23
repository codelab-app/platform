import { Transfer } from './Transfer.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const transferData: NodeReactI<Transfer.Props | Transfer.RenderProps> = {
  type: 'React.Transfer',
  props: {
    ctx: {
      __type: 'eval',
      value:
        'const [targetKeys, setTargetKeys] = this.React.useState(["4", "5"]); return { targetKeys, setTargetKeys }',
    },
    titles: ['Source', 'Target'],
    dataSource: [
      {
        key: '1',
        title: 'content1',
        description: 'description of content1',
        disabled: false,
      },
      {
        key: '2',
        title: 'content2',
        description: 'description of content2',
        disabled: true,
      },
      {
        key: '3',
        title: 'content3',
        description: 'description of content3',
        disabled: false,
      },
      {
        key: '4',
        title: 'content4',
        description: 'description of content4',
        disabled: false,
      },
      {
        key: '5',
        title: 'content5',
        description: 'description of content5',
        disabled: false,
      },
    ],
    targetKeys: {
      __type: 'eval',
      value: 'return this.targetKeys',
    },
    onChange: {
      __type: 'eval',
      value: 'return (nextTargetKeys) => this.setTargetKeys(nextTargetKeys)',
    },
    render: {
      __type: 'eval',
      value: 'return (item) => item.title',
    },
  },
}
