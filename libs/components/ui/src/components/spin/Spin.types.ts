import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Spin {
  export const propKeys = [
    'delay',
    'indicator',
    'size',
    'spinning',
    'tip',
    'wrapperClassName',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
