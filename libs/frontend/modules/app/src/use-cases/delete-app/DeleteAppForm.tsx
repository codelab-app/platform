import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { AutoFields } from 'uniforms-antd'
import { useDeleteAppMutation } from '../../store/appEndpoints'
import { appSelectors } from '../../store/appState'
import { useApp } from '../../store/useApp'
import { DeleteAppInput, DeleteAppSchema } from './deleteAppSchema'

export const DeleteAppForm = (props: UniFormUseCaseProps<DeleteAppInput>) => {
  const deletedIds = useSelector(appSelectors.deleteIds)
  const appName = useSelector(appSelectors.appName)
  const { reset, setLoading } = useApp()
  const [deleteApp] = useDeleteAppMutation()

  const mapVariables = () => ({
    variables: {
      input: {
        appId: deletedIds[0],
      },
    },
  })

  const onSumbit = async () => {
    setLoading(true)
    await deleteApp(mapVariables())
    setLoading(false)
  }

  const onSubmitError = createNotificationHandler({
    title: 'Error while deleting app',
  })

  return (
    <FormUniforms<DeleteAppInput>
      onSubmit={onSumbit}
      schema={DeleteAppSchema}
      onSubmitError={onSubmitError}
      onSubmitSuccess={reset}
      {...props}
    >
      <h4>Are you sure you want to delete app "{appName}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
