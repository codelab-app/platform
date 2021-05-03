import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetComponentsGql,
  useDeleteComponentMutation,
  useGetComponentQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeleteComponentFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentForm = (props: DeleteComponentFormProps) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deleteComponentIds },
  } = useCRUDModalForm(EntityType.Component)

  const [mutate, { loading: deleting }] = useDeleteComponentMutation({
    refetchQueries: [
      {
        query: GetComponentsGql,
      },
    ],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetComponentQuery({
    variables: {
      componentId: deleteComponentIds[0],
    },
  })

  const component = data?.component_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        componentId: deleteComponentIds[0],
      },
    })
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-form"
      id="delete-component-form"
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>Are you sure you want to delete component "{component?.label}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
