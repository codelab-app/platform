import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Radio {
  export const propKeys = [
    'autoFocus',
    'checked',
    'defaultChecked',
    'disabled',
    'value',
  ] as const

  export const groupPropKeys = [
    'defaultValue',
    'disabled',
    'name',
    'options',
    'size',
    'value',
    'onChange',
    'optionType',
    'buttonStyle',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type GroupProps = PropsFromKeys<typeof groupPropKeys[number]>
}
