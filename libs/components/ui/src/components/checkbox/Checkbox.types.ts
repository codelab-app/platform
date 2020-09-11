import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Checkbox {
  export const propKeys = [
    'autoFocus',
    'checked',
    'defaultChecked',
    'disabled',
    'indeterminate',
    'onChange',
  ] as const

  export const groupPropKeys = [
    'defaultValue',
    'disabled',
    'name',
    'options',
    'value',
    'onChange',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type GroupProps = PropsFromKeys<typeof groupPropKeys[number]>
}
