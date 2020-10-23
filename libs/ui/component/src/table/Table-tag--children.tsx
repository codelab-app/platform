import React from 'react'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'
import { PropType } from '@codelab/shared/interface/props'

export const tagChildren: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    selectNode: { __type: [PropType.Eval], value: 'return this.selectnode' },
    rowKey: 'id',
    showHeader: false,
    pagination: false,
    locale: { emptyText: ' ' },
    dataSource: {
      __type: [PropType.Eval],
      value: 'return this.record.children',
    },
    columns: [
      {
        dataIndex: 'id',
        key: 'id',
        render: {
          type: NodeType.React_Tag,
          props: {
            color: 'magenta',
            onClick: {
              __type: [PropType.Eval],
              value: 'return () => this.selectnode(this.record.id)',
            },
          },
          children: [
            {
              type: NodeType.React_Text,
              props: {
                value: {
                  __type: [PropType.Eval],
                  value: 'return this.record.id',
                },
              },
            },
          ],
        },
      },
    ],
  },
}

interface TagChildrenProps {
  selectnode: Function
  record: any
}

// export const TagChildren = Renderer.components<TagChildrenProps>(tagChildren)

export const TagChildren = (props: TagChildrenProps) => {
  console.log(props)
  const nodeChildren = props.record?.children ?? []

  return nodeChildren.map((record: any) => {
    return <p>{record.id}</p>
  })
}
