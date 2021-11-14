import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { appSelectors } from '../../store'
import { useApp } from '../../store/useApp'
import { UpdateAppForm } from './UpdateAppForm'

export const UpdateAppModal = () => {
  const currentAction = useSelector(appSelectors.actionType)
  const loading = useSelector(appSelectors.loading)
  const { reset } = useApp()

  const modalProps = {
    visible: currentAction === ActionType.Update,
    onCancel: reset,
    okText: 'Update App',
    okButtonProps: { loading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateAppForm />}
    />
  )
}
