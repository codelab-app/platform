import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { Space, Tag } from 'antd'
import React from 'react'

export const SuggestedChildrenColumn = ({
  suggestedChildren,
}: Pick<IAtomModel, 'suggestedChildren'>) => {
  return (
    <Space wrap>
      {suggestedChildren.map((atom) => {
        return (
          <Tag color="magenta" key={atom.id}>
            {atom.current.name}
          </Tag>
        )
      })}
    </Space>
  )
}
