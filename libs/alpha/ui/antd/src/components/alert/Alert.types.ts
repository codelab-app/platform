import { AlertProps } from 'antd/lib/alert'
import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Alert {
  export const propKeys = [
    'afterClose',
    'banner',
    'closable',
    'closeText',
    'description',
    'icon',
    'message',
    'showIcon',
    'type',
    'onClose',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type AntdProps = Pick<
    AlertProps,
    | 'type'
    | 'closable'
    | 'closeText'
    | 'message'
    | 'description'
    | 'onClose'
    | 'afterClose'
    | 'showIcon'
    | 'role'
    | 'prefixCls'
    | 'className'
    | 'banner'
    | 'icon'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'onClick'
  >
}
