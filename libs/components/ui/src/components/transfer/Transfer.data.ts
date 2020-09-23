import { Transfer } from './Transfer.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const transferData: NodeReactI<Transfer.Props | Transfer.RenderProps> = {
  type: 'React.Provider',
  props: {
    ctx: {
      eval: true,
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
      eval: true,
      value: 'return this.targetKeys',
    },
    onChange: {
      eval: true,
      value: 'return (nextTargetKeys) => this.setTargetKeys(nextTargetKeys)',
    },
    render: {
      eval: true,
      value: 'return (item) => item.title',
    },
  },
  children: [
    {
      type: 'React.Transfer',
    },
  ],
}
