import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateFieldForm } from '../../fields'
import { UpdateTypeForm } from '../update-type'
// import { UpdateTypeModal } from '../update-type'

export const TypeEditor = observer(() => {
  const { fieldService, typeService } = useStore()

  return (
    <div className="size-full overflow-auto">
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
      {typeService.updateForm.isOpen && <UpdateTypeForm />}
    </div>
  )
})
