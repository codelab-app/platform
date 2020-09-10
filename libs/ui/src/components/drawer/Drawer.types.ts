import { PropsFromKeys } from '@codelab/shared/interface/props'

export const drawerPropKeys = [
  'closable',
  'closeIcon',
  'destroyOnClose',
  'forceRender',
  'getContainer',
  'mask',
  'maskClosable',
  'maskStyle',
  'style',
  'drawerStyle',
  'headerStyle',
  'bodyStyle',
  'title',
  'visible',
  'width',
  'height',
  'className',
  'zIndex',
  'placement',
  'onClose',
  'afterVisibleChange',
  'keyboard',
  'footer',
  'footerStyle',
  'push',
] as const

export type DrawerProps = PropsFromKeys<typeof drawerPropKeys[number]>
