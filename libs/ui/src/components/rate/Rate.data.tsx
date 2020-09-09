import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/shared/interface'

export const ratePropKeys = [
  'allowClear',
  'allowHalf',
  'autoFocus',
  'character',
  'className',
  'count',
  'defaultValue',
  'disabled',
  'style',
  'tooltips',
  'value',
  'onBlur',
  'onChange',
  'onFocus',
  'onHoverChange',
  'onKeyDown',
] as const

type RateProps = PropsFromKeys<typeof ratePropKeys[number]>

export const rateData: ReactNodeI<RateProps> = {
  type: 'Rate',
  nodeType: 'React',
  props: {
    defaultValue: 2,
  },
}
