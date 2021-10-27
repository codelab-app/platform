import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useUpdateAppMutation } from './UpdateApp.web.graphql.gen'
import { UpdateAppSchema, updateAppSchema } from './updateAppSchema'

export const UpdateAppForm = (props: UniFormUseCaseProps<UpdateAppSchema>) => {
  const {
    crudModal: {
      reset,
      state: { metadata },
    },
    handleSubmit,
  } = useCrudModalMutationForm({
    entityType: EntityType.App,
    useMutationFunction: useUpdateAppMutation,
    mutationOptions: { refetchQueries: [] },
    mapVariables: ({ name }: UpdateAppSchema, state) => ({
      input: { data: { name }, id: state.updateId },
    }),
  })

  return (
    <FormUniforms<UpdateAppSchema>
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
