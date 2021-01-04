import { Skeleton } from './Skeleton.types'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'

export const skeletonData: NodeReactI<
  | Skeleton.Props
  | Skeleton.AvatarProps
  | Skeleton.TitleProps
  | Skeleton.ParagraphProps
  | Skeleton.ButtonProps
  | Skeleton.InputProps
> = {
  type: NodeType.React_Skeleton,
  props: {
    active: true,
    paragraph: true,
    title: true,
  },
}
