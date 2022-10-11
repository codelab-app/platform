import { Tag } from 'antd'
import React from 'react'
import { AtomRecord } from './types'

export const TagsColumn = ({ tags }: Pick<AtomRecord, 'tags'>) => {
  return (
    <div>
      {tags.map((tag) => {
        return (
          <Tag color="geekblue" key={tag.id}>
            {tag.name}
          </Tag>
        )
      })}
    </div>
  )
}
