import { FormUniformsModal } from '@codelab/frontend/view/components'
import React from 'react'
import { useAppState } from '../../hooks'
import { AppActionType } from '../../store'
import { ImportAppForm } from './ImportAppForm'
import { useImportAppForm } from './useImportAppForm'

export const ImportAppModal = () => {
  const { actionType } = useAppState()
  const { formProps, reset, state } = useImportAppForm()
  const { isLoading } = state

  return (
    <FormUniformsModal
      modalProps={{
        visible: actionType === AppActionType.Import,
        onCancel: reset,
        okText: 'Import App',
        okButtonProps: { loading: isLoading },
        bodyStyle: {
          paddingTop: '3rem',
        },
      }}
      renderForm={() => <ImportAppForm {...formProps} />}
    />
  )
}
