import React from 'react'
import { Tag } from 'antd'

import type { AtomRecord } from './types'

export const RequiredParentColumn = ({
  requiredParent,
}: Pick<AtomRecord, 'requiredParent'>) => {
  return <Tag color="green">{requiredParent?.name}</Tag>
}
