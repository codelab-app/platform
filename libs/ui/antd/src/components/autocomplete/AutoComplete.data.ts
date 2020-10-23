import { AutoComplete } from './AutoComplete.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const autocompleteData: NodeReactI<AutoComplete.Props> = {
  type: NodeType.React_Fragment,
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
      type: NodeType.React_AutoComplete,
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
