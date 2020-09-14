import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Comment {
  export const propKeys = [
    'actions',
    'author',
    'avatar',
    'children',
    'content',
    'datetime',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
