import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Input {
  export const propKeys = [
    'addonAfter',
    'addonBefore',
    'defaultValue',
    'disabled',
    'id',
    'maxLength',
    'placeholder',
    'prefix',
    'size',
    'suffix',
    'type',
    'value',
    'onChange',
    'onPressEnter',
    'allowClear',
    'bordered',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
