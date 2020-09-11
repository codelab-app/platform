import { PropsFromKeys } from '@codelab/shared/interface/props'

export const collapsePropKeys = [
  'activeKey',
  'defaultActiveKey',
  'bordered',
  'accordion',
  'onChange',
  'expandIcon',
  'expandIconPosition',
  'destroyInactivePanel',
] as const

export const collapsePanelPropKeys = [
  'disabled',
  'forceRender',
  'header',
  'key',
  'showArrow',
  'extra',
] as const

export type CollapseProps = PropsFromKeys<typeof collapsePropKeys[number]>

export type CollapsePanelProps = PropsFromKeys<
  typeof collapsePanelPropKeys[number]
>
