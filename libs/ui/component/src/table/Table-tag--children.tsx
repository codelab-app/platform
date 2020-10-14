import React from 'react'
import { NodeReactI } from '@codelab/shared/interface/node'

export const tagChildren: NodeReactI = {
  type: 'React.Table',
  props: {
    selectNode: { __type: ['Eval'], value: 'return this.selectnode' },
    rowKey: 'id',
    showHeader: false,
    pagination: false,
    locale: { emptyText: ' ' },
    dataSource: {
      __type: ['Eval'],
      value: 'return this.record.children',
    },
    columns: [
      {
        dataIndex: 'id',
        key: 'id',
        render: {
          type: 'React.Tag',
          props: {
            color: 'magenta',
            onClick: {
              __type: ['Eval'],
              value: 'return () => this.selectnode(this.record.id)',
            },
          },
          children: [
            {
              type: 'React.Text',
              props: {
                value: {
                  __type: ['Eval'],
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
