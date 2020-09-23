import { AutoComplete } from './AutoComplete.types'
import { NodeReactI } from '@codelab/shared/interface/node'

export const autocompleteData: NodeReactI<AutoComplete.Props> = {
  type: 'React.AutoComplete',
  props: {
    ctx: {
      __type: 'eval',
      value:
        'const [options, setOptions] = this.React.useState([]); const mockVal = (str, repeat = 1) =>({ value: str.repeat(repeat)}); return { options, setOptions, mockVal }',
    },
    onSearch: {
      __type: 'eval',
      value:
        'return (searchText) => this.setOptions(!searchText ? [] : [this.mockVal(searchText), this.mockVal(searchText, 2), this.mockVal(searchText, 3)])',
    },
    onSelect: {
      __type: 'eval',
      value: 'return (searchText) => console.log("Select", searchText)',
    },
    options: {
      __type: 'eval',
      value: 'return this.options',
    },

    placeholder: 'input here',
    style: { width: 200 },
  },
}
