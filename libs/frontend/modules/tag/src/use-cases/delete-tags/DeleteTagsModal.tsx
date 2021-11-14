import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectTag } from '../../store/tagState'
import { DeleteTagsForm } from './DeleteTagsForm'
import { useDeleteTagForm } from './useDeleteTagsForm'

export const DeleteTagsModal = () => {
  const { actionType } = useSelector(selectTag)

  const {
    formProps,
    reset,
    state: { isLoading },
  } = useDeleteTagForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Delete Tags',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete tags</span>,
      }}
      renderForm={() => <DeleteTagsForm {...formProps} />}
    />
  )
}
