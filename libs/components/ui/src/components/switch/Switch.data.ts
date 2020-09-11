import { ReactNodeI } from '@codelab/shared/interface/node'
import { PropsFromKeys } from '@codelab/shared/interface/props'

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
