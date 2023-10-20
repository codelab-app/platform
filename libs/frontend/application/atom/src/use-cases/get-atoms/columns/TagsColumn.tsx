import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { Tag } from 'antd'
import React from 'react'

export const TagsColumn = ({ tags }: Pick<IAtomModel, 'tags'>) => {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <Tag color="geekblue" key={tag.id}>
            {tag.current.name}
          </Tag>
        )
      })}
    </div>
  )
}
