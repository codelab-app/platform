import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

export const autocompleteData: NodeI = {
  type: AtomType.ReactFragment,
  props: {
    ctx: {
      __type: [PropType.Eval, PropType.Leaf],
      value: `\
        const [options, setOptions] = this.React.useState([]);\
        const mockVal = (str, repeat = 1) => ({ value: str.repeat(repeat)});\

        return { options, setOptions, mockVal }
      `,
    },
  },
  children: [
    {
      type: AtomType.ReactAutoComplete,
      props: {
        onSearch: {
          __type: [PropType.Eval],
          value: `return (searchText) => \
            this.ctx.setOptions( \
              !searchText ? [] : [ \
                this.ctx.mockVal(searchText), \
                this.ctx.mockVal(searchText, 2), \
                this.ctx.mockVal(searchText, 3)
              ]
            )
          `,
        },
        onSelect: {
          __type: [PropType.Eval],
          value: 'return (searchText) => console.log("Select", searchText)',
        },
        options: {
          __type: [PropType.Eval],
          value: 'return this.ctx.options',
        },
        placeholder: 'input here',
        style: { width: 200 },
      },
    },
  ],
}
