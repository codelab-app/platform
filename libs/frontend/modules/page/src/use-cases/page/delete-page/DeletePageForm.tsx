import { AppContext } from '@codelab/frontend/modules/app'
import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { refetchGetPagesQuery } from '../get-pages/GetPages.api.graphql.gen'
import { useDeletePageMutation } from './DeletePage.api.graphql.gen'

type DeletePageFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageForm = (props: DeletePageFormProps) => {
  const { app } = useContext(AppContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useCrudModalMutationForm({
    entityType: EntityType.Page,
    useMutationFunction: useDeletePageMutation,
    mutationOptions: {
      refetchQueries: [
        refetchGetPagesQuery({ input: { byApp: { appId: app.id } } }),
      ],
    },
    mapVariables: (_, state) => ({ input: { pageId: state.deleteIds[0] } }),
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting page',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete page "{metadata?.name}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
