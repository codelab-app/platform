import { Tag } from 'antd'
import React from 'react'
import { AtomRecord } from './types'

export const LibraryColumn = ({ library }: Pick<AtomRecord, 'library'>) => (
  <Tag color={library?.color} key={library?.name}>
    {library?.name}
  </Tag>
)
