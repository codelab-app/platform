import { PropsFromKeys } from '@codelab/alpha/shared/interface/props'

export namespace Carousel {
  export const propKeys = [
    'afterChange',
    'autoplay',
    'beforeChange',
    'dotPosition',
    'dots',
    'easing',
    'effect',
  ] as const

  export type Props = PropsFromKeys<typeof propKeys[number]>
}
