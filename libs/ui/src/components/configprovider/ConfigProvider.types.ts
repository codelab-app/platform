import { PropsFromKeys } from '@codelab/shared/interface'

export const configproviderPropKeys = [
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

export type ConfigProviderProps = PropsFromKeys<
  typeof configproviderPropKeys[number]
>
