import { ReactNodeI } from '@codelab/node'
import { PropsFromKeys } from '@codelab/props'

export const switchPropKeys = [
  'autoFocus',
  'checked',
  'checkedChildren',
  'defaultChecked',
  'disabled',
  'loading',
  'size',
  'unCheckedChildren',
  'onChange',
  'onClick',
  'className',
] as const

type SwitchProps = PropsFromKeys<typeof switchPropKeys[number]>

export const switchData: ReactNodeI<SwitchProps> = {
  type: 'Switch',
  nodeType: 'React',
  props: {
    checkedChildren: 'On',
    unCheckedChildren: 'Off',
  },
}
