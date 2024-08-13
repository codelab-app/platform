import { atomRef } from '@codelab/frontend/abstract/domain'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend-presentation-view/components/button'
import { Space } from 'antd'
import React from 'react'
import { useDeleteAtomsModal } from '../../delete-atom/delete-atoms.state'
import { useUpdateAtomModal } from '../../update-atom/update-atom.state'
import type { ActionColumnProps } from './types'

export const ActionColumn = ({ atom }: ActionColumnProps) => {
  const updateAtomModal = useUpdateAtomModal()
  const deleteAtomsModal = useDeleteAtomsModal()

  return (
    <Space size="middle">
      <ListItemEditButton onClick={() => updateAtomModal.open(atomRef(atom))} />
      <ListItemDeleteButton
        onClick={() => deleteAtomsModal.open([atomRef(atom)])}
      />
    </Space>
  )
}
