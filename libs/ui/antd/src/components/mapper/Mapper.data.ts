import { NodeReactI } from '@codelab/shared/interface/node'

export const mapperData: NodeReactI = {
  type: 'React.Mapper',
  props: {
    dataSource: ['Webber', 'Alex', 'Vien'],
    render: {
      type: 'React.Tag',

      children: [
        {
          type: 'React.Text',
          props: {
            value: { __type: ['Eval'], value: 'return this.item' },
          },
        },
      ],
    },
  },
}
