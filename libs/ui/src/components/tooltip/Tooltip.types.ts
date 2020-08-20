import { PropsFromKeys } from '@codelab/props'

export const tooltipPropKeys = [
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

export type TooltipProps = PropsFromKeys<typeof tooltipPropKeys[number]>
