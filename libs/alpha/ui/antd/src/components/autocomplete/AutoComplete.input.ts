import { VertexType } from '@prisma/client'
import {
  CollectionOf,
  Default,
  Description,
  Enum,
  Optional,
  Property,
  Schema,
  Title,
  getJsonSchema,
} from '@tsed/schema'
import { AutoCompleteProps as AntAutoCompleteProps } from 'antd/lib/auto-complete'

class Props implements AntAutoCompleteProps {
  @Optional()
  @Description('Show clear button')
  allowClear?: boolean

  @Optional()
  @Description('If get focus when component mounted')
  autoFocus?: boolean

  @Optional()
  @Description('If backfill selected item the input when using keyboard')
  backfill?: boolean

  @Optional()
  @CollectionOf(String)
  @Description('Customize input element')
  childrenInputElement?: Array<string>

  @Optional()
  @CollectionOf(String)
  @Description('Data source to auto complete')
  childrenDataSource?: Array<string>

  @Optional()
  @Default(true)
  @Description('Whether active first option by default')
  defaultActiveFirstOption?: boolean

  @Optional()
  @Description('Initial open state of dropdown')
  defaultOpen?: boolean

  @Optional()
  @Description('Initial selected option')
  defaultValue?: string

  @Optional()
  @Description('Whether disabled select')
  disabled?: boolean

  @Optional()
  @Description('The className of dropdown menu')
  dropdownClassName?: string

  @Optional()
  @Description(
    'Determine whether the dropdown menu and the select input are the same width. Default set min-width same as input. Will ignore when value less than select width. false will disable virtual scroll\t',
  )
  dropdownMatchSelectWidth?: number

  @Optional()
  @Description(
    'If true, filter options by input, if function, filter options against it. The function will receive two arguments, inputValue and option, if the function returns true, the option will be included in the filtered set; Otherwise, it will be excluded\t',
  )
  filterOption?: boolean

  @Optional()
  @Default('Not Found')
  @Description('Specify content to show when no result matches')
  notFoundContent?: string

  @Optional()
  @Description('Controlled open state of dropdown')
  open?: boolean

  @Optional()
  @Schema({
    type: 'array',
    description: 'Select options. Will get better perf than jsx definition',
    items: {
      type: 'object',
      properties: {
        label: { type: 'string', title: 'Label' },
        value: { type: 'string', title: 'Value' },
      },
    },
  })
  options?: Array<{ label: string; value: string }>

  @Optional()
  @Description('The placeholder of input')
  placeholder?: string

  @Optional()
  @Description('Selected option')
  value?: string

  @Optional()
  @Property('string')
  @Description('Called when leaving the component')
  onBlur?: any

  @Optional()
  @Property('string')
  @Description(
    'Called when select an option or input value change, or value of input is changed',
  )
  onChange?: any

  @Optional()
  @Property('string')
  @Description('Called when dropdown open')
  onDropdownVisibleChange?: any

  @Optional()
  @Property('string')
  @Description('Called when entering the component')
  onFocus?: any

  @Optional()
  @Property('string')
  @Description('Called when searching items')
  onSearch?: any

  @Optional()
  @Property('string')
  @Description(
    "Called when a option is selected. param is option's value and option instance",
  )
  onSelect?: any
}

export class AutoCompleteProps {
  @Property()
  @Enum(VertexType.React_AutoComplete)
  declare type: string

  @Schema(getJsonSchema(Props, { customKeys: true }))
  @Title('')
  declare props: object
}
