import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateFieldForm } from '../../fields'
import { UpdateTypeForm } from '../update-type'
// import { UpdateTypeModal } from '../update-type'

export const TypeEditor = observer(() => {
  const { fieldService, typeService } = useStore()

  return (
    <div className="h-full w-full overflow-auto">
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
      {typeService.updateForm.isOpen && <UpdateTypeForm />}
    </div>
  )
})
