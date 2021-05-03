import {
  ComponentContext,
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import {
  GetComponentDetailGql,
  useDeleteComponentElementMutation,
  useGetComponentElementQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeleteComponentElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentElementForm = (
  props: DeleteComponentElementFormProps,
) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deleteComponentElementIds },
  } = useCRUDModalForm(EntityType.ComponentElement)

  const { componentId } = useContext(ComponentContext)

  const [mutate, { loading: deleting }] = useDeleteComponentElementMutation({
    refetchQueries: [
      {
        query: GetComponentDetailGql,
        variables: {
          componentId,
        },
      },
    ],
  })

  useEffect(() => {
    setLoading(deleting)
  }, [deleting, setLoading])

  const { data, loading } = useGetComponentElementQuery({
    variables: {
      componentElementId: deleteComponentElementIds[0],
    },
  })

  const element = data?.component_element_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        componentElementId: deleteComponentElementIds[0],
      },
    })
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      data-testid="delete-component-element-form"
      id="delete-component-element-form"
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting component element',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to delete component element "{element?.label}"?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
