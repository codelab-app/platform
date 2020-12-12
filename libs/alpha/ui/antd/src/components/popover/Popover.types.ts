import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Popover {
  export const propKeys = [
    'content',
    'title',
    'arrowPointAtCenter',
    'autoAdjustOverflow',
    'defaultVisible',
    'color',
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
