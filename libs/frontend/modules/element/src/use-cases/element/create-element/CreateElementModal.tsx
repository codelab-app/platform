import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { elementActions, selectElement } from '../elementState'
import { CreateElementForm, CreateElementFormProps } from './CreateElementForm'

export const CreateElementModal = ({
  formProps,
}: {
  formProps: CreateElementFormProps
}) => {
  const { loading, actionType } = useSelector(selectElement)
  const dispatch = useDispatch()
  const reset = () => dispatch(elementActions.resetModal())

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Create',
        okButtonProps: {
          loading,
        },
        visible: actionType !== ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Create element</span>,
      }}
      renderForm={() => <CreateElementForm {...formProps} />}
    />
  )
}
