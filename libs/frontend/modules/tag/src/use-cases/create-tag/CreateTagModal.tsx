import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { useTagState } from '../../hooks/useTagState'
import { selectTag } from '../../store/tagState'
import { CreateTagForm } from './CreateTagForm'
import { useCreateTagForm } from './useCreateTagForm'

export const CreateTagModal = () => {
  const { selectedTag } = useTagState()
  const { actionType } = useSelector(selectTag)

  const {
    formProps,
    reset,
    state: { isLoading },
  } = useCreateTagForm(selectedTag?.toString())

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Create Tag',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Add hook to element</span>,
      }}
      renderForm={() => <CreateTagForm {...formProps} />}
    />
  )
}
