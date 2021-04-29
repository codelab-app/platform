import React, { useContext, useEffect } from 'react'
import {
  ComponentContext,
  createNotificationHandler,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
} from '@codelab/frontend/shared'
import {
  useDeleteComponentElementMutation,
  GetComponentDetailGql,
  useGetComponentElementQuery,
} from '@codelab/hasura'
import { useCRUDModalForm } from '@codelab/frontend/shared'
import { Spin } from 'antd'
import { AutoFields } from 'uniforms-antd'
import { emptyJsonSchema, EmptyJsonSchemaType } from '@codelab/frontend/shared'

type DeleteComponentElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentElementForm = (
  props: DeleteComponentElementFormProps,
) => {
  const {
    reset,
    setLoading,
    state: { id: componentElementId },
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
      componentElementId,
    },
  })

  const element = data?.component_element_by_pk

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        componentElementId,
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
