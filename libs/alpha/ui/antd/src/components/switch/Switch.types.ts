import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Switch {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
