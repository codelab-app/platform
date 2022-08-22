import { Tag } from 'antd'
import React from 'react'
import { LibraryColumnProps } from './types'

export const LibraryColumn = ({ library }: LibraryColumnProps) => (
  <Tag color={library?.color} key={library?.name}>
    {library?.name}
  </Tag>
)
