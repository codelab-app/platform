import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Divider {
  export const propKeys = [
    'className',
    'dashed',
    'orientation',
    'style',
    'type',
    'wrapperClassName',
    'plain',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
