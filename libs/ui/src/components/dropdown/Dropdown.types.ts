import { PropsFromKeys } from '@codelab/props'

export const dropdownPropKeys = [
  'arrow',
  'disabled',
  'getPopupContainer',
  'overlay',
  'overlayClassName',
  'overlayStyle',
  'placement',
  'trigger',
  'visible',
  'onVisibleChange',
] as const

export const dropdownButtonPropKeys = [
  'disabled',
  'icon',
  'overlay',
  'placement',
  'size',
  'trigger',
  'type',
  'visible',
  'onClick',
  'onVisibleChange',
  'buttonsRender',
] as const

export type DropdownProps = PropsFromKeys<typeof dropdownPropKeys[number]>

export type DropdownButtonProps = PropsFromKeys<
  typeof dropdownButtonPropKeys[number]
>
