import type { AntdTag } from './antd-tag.interface'
import type { HtmlTag } from './html-tag.interface'
import type { ReactTag } from './react-tag.interface'

/**
 * This is the node within a tag tree, allows for hierarchical data in json format
 *
 * A `string` allows no children, while an object allows for children
 */
// export type TagNode<T extends AntdTag | HtmlTag | ReactTag> =
//   | T
//   | {
//       readonly [K in T]: ReadonlyArray<TagNode<T>>
//     }

export type TagNode<
  T extends AntdTag | HtmlTag | ReactTag = AntdTag | HtmlTag | ReactTag,
> =
  | T
  | {
      readonly [K in T]?: ReadonlyArray<TagNode<T>>
    }

// export type TagNode = string | { [key: string]: Array<TagNode> }

/**
 * This is the flattened node data
 */
export interface TagNodeData {
  children: Array<TagNodeData>
  name: string
  parent: string | null
}
