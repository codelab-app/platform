import { PropsFromKeys } from '@codelab/shared/interface/props'
import {
  ReactNodeI,
  ReactNodeTypeEnum,
  NodeTypeEnum,
} from '@codelab/shared/interface/node'

export namespace Select {
  export const propKeys = [
    'allowClear',
    'autoClearSearchValue',
    'autoFocus',
    'defaultActiveFirstOption',
    'defaultValue',
    'disabled',
    'dropdownClassName',
    'dropdownMatchSelectWidth',
    'dropdownRender',
    'dropdownStyle',
    'filterOption',
    'getPopupContainer',
    'labelInValue',
    'listHeight',
    'maxTagCount',
    'maxTagTextLength',
    'maxTagPlaceholder',
    'tagRender',
    'mode',
    'notFoundContent',
    'options',
    'optionFilterProp',
    'optionLabelProp',
    'placeholder',
    'showArrow',
    'showSearch',
    'size',
    'suffixIcon',
    'removeIcon',
    'clearIcon',
    'menuItemSelectedIcon',
    'tokenSeparators',
    'value',
    'virtual',
    'onBlur',
    'onChange',
    'onDeselect',
    'onFocus',
    'onInputKeyDown',
    'onMouseEnter',
    'onMouseLeave',
    'onPopupScroll',
    'onSearch',
    'onSelect',
    'defaultOpen',
    'open',
    'onDropdownVisibleChange',
    'loading',
    'bordered',
  ] as const

  export const optionPropKeys = [
    'disabled',
    'title',
    'value',
    'className',
  ] as const

  type Test = typeof optionPropKeys[number]

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type OptionProps = PropsFromKeys<typeof optionPropKeys[number]>

  export const createSelect = (): ReactNodeI<Props> => ({
    type: 'Select',
    nodeType: 'React',
    props: {
      style: {
        width: 120,
      },
    },
  })

  export const createOptions = (
    type: typeof NodeTypeEnum,
  ): Array<ReactNodeI<OptionProps>> =>
    Object.entries(type).map(([key, value]: [string, any]) => ({
      type: 'Select.Option',
      nodeType: 'React',
      props: {
        value,
      },
      children: [
        {
          type: 'Text',
          nodeType: 'React',
          props: {
            value: key,
          },
        },
      ],
    }))
}
