import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { AutoFields } from 'uniforms-antd'
import { appSelectors } from '../..'
import { useUpdateAppMutation } from '../../store/appEndpoints'
import { useApp } from '../../store/useApp'
import { UpdateAppSchema, updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppSchema>) => {
  const appName = useSelector(appSelectors.appName)
  const loading = useSelector(appSelectors.loading)
  const updateId = useSelector(appSelectors.updateId)
  const { setLoading, reset } = useApp()
  const [updateApp] = useUpdateAppMutation()

  const mapVariables = ({ name }: UpdateAppSchema) => ({
    variables: {
      input: {
        data: { name },
        id: updateId,
      },
    },
  })

  const onSubmit = async (submittedData: UpdateAppSchema) => {
    setLoading(true)
    await updateApp(mapVariables(submittedData))
    setLoading(false)
  }

  const onSubmitError = createNotificationHandler({
    title: `Error while updating app '${appName}'`,
  })

  return (
    <FormUniforms<UpdateAppSchema>
      onSubmit={onSubmit}
      schema={updateAppSchema}
      onSubmitError={onSubmitError}
      model={{ name: appName }}
      onSubmitSuccess={reset}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
