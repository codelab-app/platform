import { NodeReactI } from '@codelab/alpha/shared/interface/node'
import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Comment {
  export const propKeys = [
    // 'actions',
    'author',
    'avatar',
    'children',
    'content',
    'datetime',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]> & {
    actions: Array<NodeReactI>
  }
}
