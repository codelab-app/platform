import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import {
  UpdatePropMapBindingForm,
  UpdatePropMapBindingFormProps,
} from './UpdatePropMapBindingForm'

export const UpdatePropMapBindingModal = (
  props: UpdatePropMapBindingFormProps,
) => {
  return (
    <CrudModal
      entityType={EntityType.PropMapBinding}
      actionType={ActionType.Update}
      okText="Update"
      renderForm={() => <UpdatePropMapBindingForm {...props} />}
    />
  )
}
