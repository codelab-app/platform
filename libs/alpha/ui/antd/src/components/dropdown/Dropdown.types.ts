import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Dropdown {
  export const propKeys = [
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

  export const buttonPropKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ButtonProps = PropsFromKeys<typeof buttonPropKeys[number]>
}
