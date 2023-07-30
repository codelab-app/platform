import { UpdateFieldForm } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateAtomForm } from '../update-atom'

export const AtomForm = observer(() => {
  const { atomService, fieldService } = useStore()

  return (
    <>
      {atomService.updateForm.isOpen && <UpdateAtomForm />}
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
    </>
  )
})
