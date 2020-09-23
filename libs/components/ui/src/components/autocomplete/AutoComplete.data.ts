import { AutoComplete } from './AutoComplete.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const autocompleteData: NodeReactI<AutoComplete.Props> = {
  type: 'React.Provider',
  props: {
    ctx: {
      eval: true,
      value:
        'const [options, setOptions] = this.React.useState([]); const mockVal = (str, repeat = 1) =>({ value: str.repeat(repeat)}); return { options, setOptions, mockVal }',
    },
    onSearch: {
      eval: true,
      value:
        'return (searchText) => this.setOptions(!searchText ? [] : [this.mockVal(searchText), this.mockVal(searchText, 2), this.mockVal(searchText, 3)])',
    },
    onSelect: {
      eval: true,
      value: 'return (searchText) => console.log("Select", searchText)',
    },
    options: {
      eval: true,
      value: 'return this.options',
    },
  },
  children: [
    {
      type: 'React.AutoComplete',
      props: {
        placeholder: 'input here',
        style: { width: 200 },
      },
    },
  ],
}
