import { PropsFromKeys } from '@codelab/shared/interface'

export const popoverPropKeys = [
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

export type PopoverProps = PropsFromKeys<typeof popoverPropKeys[number]>
