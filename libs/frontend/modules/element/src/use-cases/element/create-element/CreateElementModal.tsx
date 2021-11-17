import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { elementActions, selectElement } from '../../../store'
import { CreateElementForm } from './CreateElementForm'
import {
  CreateElementInitialData,
  useCreateElementForm,
} from './useCreateElementForm'

export const CreateElementModal = ({
  initialData,
}: {
  initialData?: CreateElementInitialData
}) => {
  const { actionType } = useSelector(selectElement)
  const dispatch = useDispatch()
  const reset = () => dispatch(elementActions.resetModal())

  const {
    state: { isLoading },
    formProps,
  } = useCreateElementForm(initialData)

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Create',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Create element</span>,
      }}
      renderForm={() => <CreateElementForm {...formProps} />}
    />
  )
}
