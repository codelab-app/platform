import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import { Tag } from 'antd'
import React from 'react'

export const LibraryColumn = ({ library }: Pick<IAtomModel, 'library'>) => (
  <Tag color={library.color} key={library.name}>
    {library.name}
  </Tag>
)
