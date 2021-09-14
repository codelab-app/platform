import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import {
  CreatePropMapBindingForm,
  CreatePropMapBindingFormProps,
} from './CreatePropMapBindingForm'

export const CreatePropMapBindingModal = (
  props: CreatePropMapBindingFormProps,
) => {
  return (
    <CrudModal
      entityType={EntityType.PropMapBinding}
      actionType={ActionType.Create}
      okText="Create"
      renderForm={() => <CreatePropMapBindingForm {...props} />}
    />
  )
}
