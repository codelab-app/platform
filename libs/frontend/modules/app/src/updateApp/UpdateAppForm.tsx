import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  CreateAppInput,
  refetchGetAppsQuery,
  UpdateAppData,
  useUpdateAppMutation,
} from '@codelab/shared/codegen/graphql'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppData>) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useUpdateAppMutation,
    mutationOptions: { refetchQueries: [refetchGetAppsQuery()] },
    mapVariables: ({ name }: CreateAppInput, state) => ({
      input: { data: { name }, id: state.updateId },
    }),
  })

  return (
    <FormUniforms<UpdateAppData>
      onSubmit={handleSubmit}
      schema={updateAppSchema}
      model={{
        name: metadata?.name,
      }}
      onSubmitError={createNotificationHandler({
        title: `Error while updating app '${metadata?.name}'`,
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields />
    </FormUniforms>
  )
}
