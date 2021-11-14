import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectTag } from '../../store/tagState'
import { UpdateTagForm } from './UpdateTagForm'
import { useUpdateTagForm } from './useUpdateTagForm'

export const UpdateTagModal = () => {
  const { actionType } = useSelector(selectTag)

  const {
    formProps,
    reset,
    state: { isLoading },
  } = useUpdateTagForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Update Tag',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Update,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Add hook to element</span>,
      }}
      renderForm={() => <UpdateTagForm {...formProps} />}
    />
  )
}
