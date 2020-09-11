import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Tooltip {
  export const propKeys = [
    'title',
    'arrowPointAtCenter',
    'autoAdjustOverflow',
    'defaultVisible',
    'getPopupContainer',
    'mouseEnterDelay',
    'mouseLeaveDelay',
    'overlayClassName',
    'overlayStyle',
    'placement',
    'trigger',
    'visible',
    'onVisibleChange',
    'align',
    'destroyTooltipOnHide',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
