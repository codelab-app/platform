import React, { useEffect } from 'react'
import {
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  useDeleteComponentMutation,
  GetComponentsGql,
  useGetComponentQuery,
} from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
import { emptyJsonSchema, EmptyJsonSchemaType } from '@codelab/frontend/shared'

type DeleteComponentFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentForm = (props: DeleteComponentFormProps) => {
  const {
    reset,
    setLoading,
    state: { id: componentId },
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
      componentId,
    },
  })

  const component = data?.component_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        componentId,
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
