import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useApp } from '../..'
import { appSelectors } from '../../store'
import { DeleteAppForm } from './DeleteAppForm'

export const DeleteAppModal = () => {
  const currentAction = useSelector(appSelectors.actionType)
  const loading = useSelector(appSelectors.loading)
  const { reset } = useApp()

  const modalProps = {
    visible: currentAction === ActionType.Delete,
    onCancel: reset,
    okText: 'Delete App',
    okButtonProps: { loading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteAppForm />}
    />
  )
}
