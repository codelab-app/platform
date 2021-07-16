import {
  refetchGetPagesQuery,
  useCreatePageMutation,
} from '@codelab/codegen/graphql'
import {
  AppContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { createPageSchema, CreatePageSchemaType } from './createPageSchema'

type CreatePageFormProps = UniFormUseCaseProps<CreatePageSchemaType>

export const CreatePageForm = (props: CreatePageFormProps) => {
  const { app } = useContext(AppContext)

  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    entityType: EntityType.Page,
    useMutationFunction: useCreatePageMutation,
    mutationOptions: {
      refetchQueries: [
        refetchGetPagesQuery({ input: { byApp: { appId: app.id } } }),
      ],
    },
    mapVariables: (submitData: CreatePageSchemaType) => ({
      input: { ...submitData, appId: app.id },
    }),
  })

  return (
    <FormUniforms<CreatePageSchemaType>
      onSubmit={handleSubmit}
      schema={createPageSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating page',
      })}
      onSubmitSuccess={() => {
        reset()
      }}
      {...props}
    >
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
