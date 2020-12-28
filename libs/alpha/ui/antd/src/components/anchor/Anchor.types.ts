import { AnchorProps } from 'antd/lib/anchor'
import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Anchor {
  export const anchorPropKeys = [
    'affix',
    'bounds',
    'getContainer',
    'offsetTop',
    'showInkInFixed',
    'onClick',
    'getCurrentAnchor',
    'targetOffset',
    'onChange',
    'title',
  ] as const

  export const linkPropKeys = ['href', 'title', 'target'] as const

  export type Props = PropsFromKeys<typeof anchorPropKeys[number]>

  export type LinkProps = PropsFromKeys<typeof linkPropKeys[number]>

  export type AntdProps = Pick<
    AnchorProps,
    | 'offsetTop'
    | 'bounds'
    | 'affix'
    | 'showInkInFixed'
    | 'getContainer'
    | 'getCurrentAnchor'
    | 'onClick'
    | 'targetOffset'
    | 'onChange'
  >
}
