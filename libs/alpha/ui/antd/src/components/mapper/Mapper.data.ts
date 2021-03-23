import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const mapperData: NodeI = {
  type: AtomType.ReactMapper,
  props: {
    dataSource: ['Webber', 'Alex', 'Vien'],
    render: {
      type: AtomType.ReactTag,

      children: [
        {
          type: AtomType.ReactText,
          props: {
            value: { __type: [PropType.Eval], value: 'return this.item' },
          },
        },
      ],
    },
  },
}
