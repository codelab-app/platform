import { PropsFromKeys } from '@codelab/shared/interface/props'

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
}
