import { PropsFromKeys } from '@codelab/shared/interface/props'

export const layoutPropKeys = ['hasSider', 'className', 'style'] as const

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

export type LayoutProps = PropsFromKeys<typeof layoutPropKeys[number]>

export type SiderProps = PropsFromKeys<typeof siderPropKeys[number]>
