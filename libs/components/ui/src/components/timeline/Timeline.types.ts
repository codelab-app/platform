import { PropsFromKeys } from '@codelab/shared/interface/props'

export namespace Timeline {
  export const propKeys = ['pending', 'pendingDot', 'reverse', 'mode']

  export const itemPropKeys = ['color', 'dot', 'position', 'label']

  export type Props = PropsFromKeys<typeof propKeys[number]>

  export type ItemProps = PropsFromKeys<typeof itemPropKeys[number]>
}
