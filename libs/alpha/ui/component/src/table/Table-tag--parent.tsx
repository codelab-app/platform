import { Renderer } from '@codelab/alpha/core/renderer'
import { NodeReactI, NodeType } from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

export const tagParent: NodeReactI = {
  type: NodeType.React_Tag,
  props: {
    color: {
      __type: [PropType.Eval],
      value: 'return this.record.parent? "geekblue" : "white"',
    },
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => this.selectnode(this.record.parent)',
    },
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: {
          __type: [PropType.Eval],
          value: 'return this.record.parent ?? ""',
        },
      },
    },
  ],
}

interface TagParentProps {
  record: any
  selectnode: Function
}

export const TagParent = Renderer.components<TagParentProps>(tagParent)
