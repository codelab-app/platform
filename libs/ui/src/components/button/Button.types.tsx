import { PropsFromKeys } from '@codelab/shared/interface'

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

// Some changes here

export type ButtonProps = PropsFromKeys<typeof buttonPropKeys[number]>
