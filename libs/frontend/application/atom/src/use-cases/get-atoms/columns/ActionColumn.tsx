import { atomRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend-presentation-view/components'
import { Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { ActionColumnProps } from './types'

export const ActionColumn = observer<ActionColumnProps>(({ atom }) => {
  const { atomService } = useStore()

  return (
    <Space size="middle">
      <ListItemEditButton
        onClick={() => atomService.updateModal.open(atomRef(atom))}
      />
      <ListItemDeleteButton
        onClick={() => atomService.deleteManyModal.open([atomRef(atom)])}
      />
    </Space>
  )
})
