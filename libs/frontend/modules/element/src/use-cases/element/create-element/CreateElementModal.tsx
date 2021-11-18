import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useElementDispatch, useElementState } from '../../../hooks'
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
  const { actionType } = useElementState()
  const { resetModal } = useElementDispatch()

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
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Create element</span>,
      }}
      renderForm={() => <CreateElementForm {...formProps} />}
    />
  )
}
