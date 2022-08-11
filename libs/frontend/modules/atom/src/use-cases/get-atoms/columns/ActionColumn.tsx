import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { atomRef } from '../../../store'
import { ActionColumnProps } from './types'

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
