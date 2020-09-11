import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Modal {
  export const propKeys = [
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

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
