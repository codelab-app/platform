import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Timeline {
  export const propKeys = ['pending', 'pendingDot', 'reverse', 'mode'] as const

  export const itemPropKeys = ['color', 'dot', 'position', 'label'] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>
}
