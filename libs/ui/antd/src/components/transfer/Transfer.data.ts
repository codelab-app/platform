import { Transfer } from './Transfer.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

export const transferData: NodeReactI<Transfer.Props | Transfer.RenderProps> = {
  type: NodeType.React_Fragment,
  props: {
    ctx: {
      __type: ['Eval', 'Leaf'],
      value: `
        const [targetKeys, setTargetKeys] = this.React.useState(["4", "5"]); 
        
        return { targetKeys, setTargetKeys }
      `,
    },
  },
  children: [
    {
      type: NodeType.React_Transfer,
      props: {
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
          __type: ['Eval'],
          value: 'return this.ctx.targetKeys',
        },
        onChange: {
          __type: ['Eval'],
          value:
            'return (nextTargetKeys) => this.ctx.setTargetKeys(nextTargetKeys)',
        },
        render: {
          __type: ['Eval'],
          value: 'return (item) => item.title',
        },
      },
    },
  ],
}
