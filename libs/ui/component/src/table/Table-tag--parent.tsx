import { Renderer } from '@codelab/core/renderer'
import { NodeReactI } from '@codelab/shared/interface/node'

export const tagParent: NodeReactI = {
  type: 'React.Tag',
  props: {
    color: {
      __type: ['Eval'],
      value: 'return this.record.parent? "geekblue" : "white"',
    },
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.selectnode(this.record.parent)',
    },
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: {
          __type: ['Eval'],
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
