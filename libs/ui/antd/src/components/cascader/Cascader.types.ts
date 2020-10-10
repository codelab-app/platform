import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Cascader {
  export const propKeys = [
    'allowClear',
    'autoFocus',
    'bordered',
    'changeOnSelect',
    'className',
    'defaultValue',
    'disabled',
    'displayRender',
    'expandTrigger',
    'expandIcon',
    'fieldNames',
    'getPopupContainer',
    'loadData',
    'notFoundContent',
    'options',
    'placeholder',
    'popupPlacement',
    'popupClassName',
    'popupVisible',
    'showSearch',
    'size',
    'style',
    'suffixIcon',
    'value',
    'dropdownRender',
    'onChange',
    'onPopupVisibleChange',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
