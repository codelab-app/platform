import { UpdateFieldForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { Empty, Typography } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateAtomForm } from '../update-atom'

export const AtomForm = observer(() => {
  const { atomService, fieldService } = useStore()

  const formLabel = atomService.updateForm.isOpen
    ? 'Edit Atom'
    : fieldService.updateForm.isOpen
    ? 'Edit Field'
    : null

  const atomStory = atomService.updateForm.isOpen ? (
    <>
      <Typography className="text-2xl">Examples</Typography>
      <div className="flex grow flex-col justify-center">
        <Empty></Empty>
      </div>
    </>
  ) : null

  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      {atomStory}

      <Typography className="text-2xl">{formLabel}</Typography>
      {atomService.updateForm.isOpen && <UpdateAtomForm />}
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
    </div>
  )
})
