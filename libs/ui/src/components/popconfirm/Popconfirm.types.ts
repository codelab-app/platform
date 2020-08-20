import { PropsFromKeys } from '@codelab/props'

export const popconfirmPropKeys = [
  'cancelText',
  'okText',
  'okType',
  'okButtonProps',
  'cancelButtonProps',
  'title',
  'onCancel',
  'onConfirm',
  'icon',
  'disabled',
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

export type PopconfirmProps = PropsFromKeys<typeof popconfirmPropKeys[number]>
