import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Collapse {
  export const propKeys = [
    'activeKey',
    'defaultActiveKey',
    'bordered',
    'accordion',
    'onChange',
    'expandIcon',
    'expandIconPosition',
    'destroyInactivePanel',
  ] as const

  export const panelPropKeys = [
    'disabled',
    'forceRender',
    'header',
    'key',
    'showArrow',
    'extra',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type PanelProps = PropsFromKeys<typeof panelPropKeys[number]>
}
