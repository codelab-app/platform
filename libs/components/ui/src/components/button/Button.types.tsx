import { PropsFromKeys } from '@codelab/shared/interface/props'

export const buttonPropKeys = [
  'disabled',
  'ghost',
  'href',
  'htmlType',
  'icon',
  'loading',
  'shape',
  'size',
  'target',
  'type',
  'onClick',
  'block',
  'danger',
] as const

export type ButtonProps = PropsFromKeys<typeof buttonPropKeys[number]>
