import { useStore } from '@codelab/frontend/presentation/container'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateFieldForm } from '../../fields'
// import { UpdateTypeModal } from '../update-type'

export const TypeEditor = observer(() => {
  const { fieldService } = useStore()
  const field = fieldService.updateForm.field

  return (
    <div className="h-full w-full overflow-auto">
      <div>{field?.name ?? ''}</div>
      {fieldService.updateForm.isOpen && <UpdateFieldForm />}
      {/* <UpdateTypeModal /> */}
    </div>
  )
})
