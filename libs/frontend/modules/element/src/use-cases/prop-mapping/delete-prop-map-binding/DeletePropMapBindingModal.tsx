import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import {
  DeletePropMapBindingForm,
  DeletePropMapBindingFormProps,
} from './DeletePropMapBindingForm'

export const DeletePropMapBindingModal = (
  props: DeletePropMapBindingFormProps,
) => {
  return (
    <CrudModal
      entityType={EntityType.PropMapBinding}
      actionType={ActionType.Delete}
      okText="Delete"
      renderForm={() => <DeletePropMapBindingForm {...props} />}
    />
  )
}
