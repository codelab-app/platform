import {
  refetchGetPageQuery,
  useDeletePageElementMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { PageContext } from '../../providers'

export type DeletePageElementFormProps =
  UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeletePageElementForm = ({
  onSubmitError,
  onSubmitSuccess,
  ...props
}: DeletePageElementFormProps) => {
  const { pageId } = useContext(PageContext)

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useMutationCrudForm({
    entityType: EntityType.PageElement,
    useMutationFunction: useDeletePageElementMutation,
    mapVariables: (_, state) => ({
      input: { pageElementId: state.deleteIds[0] },
    }),
    mutationOptions: {
      refetchQueries: [
        refetchGetPageQuery({ input: { pageId: pageId || '' } }),
      ],
    },
  })

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      onSubmit={handleSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component element',
      })}
      onSubmitSuccess={[
        () => reset(),
        ...(Array.isArray(onSubmitSuccess)
          ? onSubmitSuccess
          : [onSubmitSuccess]),
      ]}
      {...props}
    >
      <h4>
        Are you sure you want to delete{' '}
        {metadata?.name ? `the element "${metadata?.name}"` : 'that element'}?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
