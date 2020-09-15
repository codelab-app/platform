import { Skeleton } from './Skeleton.types'
import { NodeDtoI } from '@codelab/shared/interface/node'

export const skeletonData: NodeDtoI<
  | Skeleton.Props
  | Skeleton.AvatarProps
  | Skeleton.TitleProps
  | Skeleton.ParagraphProps
  | Skeleton.ButtonProps
  | Skeleton.InputProps
> = {
  type: 'React.Skeleton',
  props: {
    active: true,
    paragraph: true,
    title: true,
  },
}
