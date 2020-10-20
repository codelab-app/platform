import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Mapper {
  export const propKeys = ['dataSource', 'render'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
