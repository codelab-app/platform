import {
  refetchGetPagesQuery,
  useUpdatePageMutation,
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
import { updatePageSchema, UpdatePageSchemaType } from './updatePageSchema'

type UpdatePageFormProps = UniFormUseCaseProps<UpdatePageSchemaType>

export const UpdatePageForm = (props: UpdatePageFormProps) => {
  const { app } = useContext(AppContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Page,
    useMutationFunction: useUpdatePageMutation,
    mutationOptions: {
      refetchQueries: [
        refetchGetPagesQuery({ input: { byApp: { appId: app.id } } }),
      ],
    },
    mapVariables: (submitData: UpdatePageSchemaType, state) => ({
      input: {
        pageId: state.updateId,
        updateData: { ...submitData, appId: app.id },
      },
    }),
  })

  return (
    <FormUniforms<UpdatePageSchemaType>
      onSubmit={handleSubmit}
      schema={updatePageSchema}
      model={{ name: metadata?.name }}
      onSubmitError={createNotificationHandler({
        title: 'Error while updating page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields omitFields={['appId']} />
    </FormUniforms>
  )
}
