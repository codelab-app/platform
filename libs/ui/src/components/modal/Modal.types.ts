import { PropsFromKeys } from '@codelab/shared/interface'

export const modalPropKeys = [
  'afterClose',
  'bodyStyle',
  'cancelText',
  'centered',
  'closable',
  'closeIcon',
  'confirmLoading',
  'destroyOnClose',
  'footer',
  'forceRender',
  'getContainer',
  'mask',
  'maskClosable',
  'maskStyle',
  'okText',
  'okType',
  'okButtonProps',
  'cancelButtonProps',
  'style',
  'title',
  'visible',
  'width',
  'wrapClassName',
  'zIndex',
  'onCancel',
  'onOk',
]

export type ModalProps = PropsFromKeys<typeof modalPropKeys[number]>
