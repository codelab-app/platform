import { Space, Tag } from 'antd'
import React from 'react'
import type { AtomRecord } from './types'

export const RequiredParentsColumn = ({
  requiredParents,
}: Pick<AtomRecord, 'requiredParents'>) => {
  return (
    <Space wrap>
      {requiredParents.map((atom) => {
        return (
          <Tag color="magenta" key={atom.id}>
            {atom.name}
          </Tag>
        )
      })}
    </Space>
  )
}
