import { PropsFromKeys } from '@codelab/shared/interface'

export const carouselPropKeys = [
  'afterChange',
  'autoplay',
  'beforeChange',
  'dotPosition',
  'dots',
  'easing',
  'effect',
] as const

export type CarouselProps = PropsFromKeys<typeof carouselPropKeys[number]>
