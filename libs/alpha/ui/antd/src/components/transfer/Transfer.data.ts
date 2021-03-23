import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const transferData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `
        const [targetKeys, setTargetKeys] = this.React.useState(["4", "5"]);

        return { targetKeys, setTargetKeys }
      `,
    },
  },
  children: [
    {
      type: AtomType.ReactTransfer,
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
          __type: [PropType.Eval],
          value: 'return this.ctx.targetKeys',
        },
        onChange: {
          __type: [PropType.Eval],
          value:
            'return (nextTargetKeys) => this.ctx.setTargetKeys(nextTargetKeys)',
        },
        render: {
          __type: [PropType.Eval],
          value: 'return (item) => item.title',
        },
      },
    },
  ],
}
