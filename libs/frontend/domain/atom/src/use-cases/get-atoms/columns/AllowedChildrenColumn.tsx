import { Space, Tag } from 'antd'
import React from 'react'
import { AtomRecord } from './types'

export const AllowedChildrenColumn = ({
  allowedChildren,
}: Pick<AtomRecord, 'allowedChildren'>) => {
  return (
    <Space wrap>
      {allowedChildren.map((atom) => {
        return (
          <Tag color="magenta" key={atom.id}>
            {atom.name}
          </Tag>
        )
      })}
    </Space>
  )
}
