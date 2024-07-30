import { observer } from 'mobx-react-lite'
import React from 'react'
import { UpdateFieldForm, useUpdateFieldForm } from '../update-field'
import { UpdateTypeForm, useUpdateTypeForm } from '../update-type'

export const TypeEditor = observer(() => {
  const updateFieldForm = useUpdateFieldForm()
  const updateTypeForm = useUpdateTypeForm()

  return (
    <div className="size-full overflow-auto">
      {updateFieldForm.isOpen && <UpdateFieldForm />}
      {updateTypeForm.isOpen && <UpdateTypeForm />}
    </div>
  )
})
