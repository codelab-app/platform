import { Space, Tag } from 'antd'
import React from 'react'
import type { AtomRecord } from './types'

export const SuggestedChildrenColumn = ({
  suggestedChildren,
}: Pick<AtomRecord, 'suggestedChildren'>) => {
  return (
    <Space wrap>
      {suggestedChildren.map((atom) => {
        return (
          <Tag color="magenta" key={atom.id}>
            {atom.name}
          </Tag>
        )
      })}
    </Space>
  )
}
