import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace ConfigProvider {
  export const propKeys = [
    'autoInsertSpaceInButton',
    'componentSize',
    'csp',
    'form',
    'input',
    'renderEmpty',
    'getPopupContainer',
    'getTargetContainer',
    'locale',
    'prefixCls',
    'pageHeader',
    'direction',
    'space',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
