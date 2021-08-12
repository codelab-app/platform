import { AppContext } from '@codelab/frontend/presenter/container'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import {
  refetchGetPagesQuery,
  useCreatePageMutation,
} from '@codelab/shared/codegen/graphql'
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
