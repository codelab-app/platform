import { ReactNodeI } from '@codelab/shared/interface/node'
import { Skeleton } from './Skeleton.types'

export const skeletonData: ReactNodeI<
  | Skeleton.Props
  | Skeleton.AvatarProps
  | Skeleton.TitleProps
  | Skeleton.ParagraphProps
  | Skeleton.ButtonProps
  | Skeleton.InputProps
> = {
  type: 'Skeleton',
  nodeType: 'React',
  props: {
    active: true,
    paragraph: true,
    title: true,
  },
}
