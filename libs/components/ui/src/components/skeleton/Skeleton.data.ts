import { ReactNodeI } from '@codelab/shared/interface/node'
import {
  SkeletonProps,
  AvatarProps,
  TitleProps,
  ParagraphProps,
  ButtonProps,
  InputProps,
} from './Skeleton.types'

export const skeletonData: ReactNodeI<
  | SkeletonProps
  | AvatarProps
  | TitleProps
  | ParagraphProps
  | ButtonProps
  | InputProps
> = {
  type: 'Skeleton',
  nodeType: 'React',
  props: {
    active: true,
    paragraph: true,
    title: true,
  },
}
