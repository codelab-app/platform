import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { useApp } from '../..'
import { appSelectors } from '../../store'
import { CreateAppForm } from './CreateAppForm'

export const CreateAppModal = () => {
  const currentAction = useSelector(appSelectors.actionType)
  const loading = useSelector(appSelectors.loading)
  const { reset } = useApp()

  const modalProps = {
    visible: currentAction === ActionType.Create,
    onCancel: reset,
    okText: 'Create App',
    okButtonProps: { loading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreateAppForm />}
    />
  )
}
