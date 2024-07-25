import { useStore } from '@codelab/frontend/infra/mobx'
import { UpdateFieldForm } from '@codelab/frontend-application-type/use-cases/update-field'
import { Empty, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateAtomForm } from '../update-atom'
import { useUpdateAtomModal } from '../update-atom/update-atom.state'

export const AtomForm = observer(() => {
  const { fieldService } = useStore()
  const updateAtomForm = useUpdateAtomModal()

  const formLabel = updateAtomForm.isOpen
    ? 'Edit Atom'
    : fieldService.updateForm.isOpen
    ? 'Edit Field'
    : null

  const atomStory = updateAtomForm.isOpen ? (
    <>
      <Typography className="text-2xl">Examples</Typography>
      <div className="flex grow flex-col justify-center">
        <Empty></Empty>
      </div>
    </>
  ) : null

  return (
    <div className="flex size-full flex-col overflow-auto">
      {atomStory}

      <Typography className="text-2xl">{formLabel}</Typography>
      {updateAtomForm.isOpen && <UpdateAtomForm />}
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
    </div>
  )
})
