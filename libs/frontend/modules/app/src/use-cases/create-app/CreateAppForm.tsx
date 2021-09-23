import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { refetchGetAppsQuery } from '../get-apps/GetApps.web.graphql.gen'
import { useCreateAppMutation } from './CreateApp.web.graphql.gen'
import { CreateAppInput, createAppSchema } from './createAppSchema'

export const CreateAppForm = (props: UniFormUseCaseProps<CreateAppInput>) => {
  const {
    crudModal: { reset },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useCreateAppMutation,
    mutationOptions: { refetchQueries: [refetchGetAppsQuery()] },
    mapVariables: ({ name }: CreateAppInput) => ({ input: { name } }),
  })

  return (
    <FormUniforms<CreateAppInput>
      onSubmit={handleSubmit}
      schema={createAppSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating app',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
