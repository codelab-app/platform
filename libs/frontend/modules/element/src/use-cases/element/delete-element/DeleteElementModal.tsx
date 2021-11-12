import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { elementActions, selectElement } from '../elementState'
import { DeleteElementForm, DeleteElementFormProps } from './DeleteElementForm'

interface Props {
  formProps?: DeleteElementFormProps
}

export const DeleteElementModal = ({ formProps }: Props) => {
  const { loading, actionType } = useSelector(selectElement)
  const dispatch = useDispatch()
  const reset = () => dispatch(elementActions.resetModal())

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Delete',
        okButtonProps: {
          loading,
        },
        visible: actionType !== ActionType.Delete,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete element</span>,
      }}
      renderForm={() => <DeleteElementForm {...formProps} />}
    />
  )
}
