import { atomRef } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { ActionColumnProps } from './types'

export const ActionColumn = observer<ActionColumnProps>(
  ({ atom, atomService }) => {
    return (
      <Space size="middle">
        <ListItemEditButton
          onClick={() => atomService.updateModal.open(atomRef(atom.id))}
        />
        <ListItemDeleteButton
          onClick={() => atomService.deleteManyModal.open([atomRef(atom.id)])}
        />
      </Space>
    )
  },
)
