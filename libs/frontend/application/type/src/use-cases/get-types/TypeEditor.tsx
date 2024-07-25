import { useStore } from '@codelab/frontend/infra/mobx'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateFieldForm } from '../update-field'
import { UpdateTypeForm } from '../update-type'

export const TypeEditor = observer(() => {
  const { fieldService, typeService } = useStore()

  return (
    <div className="size-full overflow-auto">
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
      {typeService.updateForm.isOpen && <UpdateTypeForm />}
    </div>
  )
})
