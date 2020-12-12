import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Layout {
  export const propKeys = ['hasSider', 'className', 'style'] as const

  export const siderPropKeys = [
    'breakpoint',
    'className',
    'collapsed',
    'collapsedWidth',
    'collapsible',
    'defaultCollapsed',
    'onBreakpoint ',
    'onCollapse',
    'reverseArrow',
    'style',
    'theme',
    'trigger',
    'width',
    'zeroWidthTriggerStyle',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type SiderProps = PropsFromKeys<typeof siderPropKeys[number]>
}
