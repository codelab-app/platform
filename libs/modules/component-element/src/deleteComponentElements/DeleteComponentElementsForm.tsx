import {
  refetchGetComponentDetailQuery,
  useDeleteComponentElementsMutation,
  useGetComponentElementQuery,
  useGetComponentElementsWhereQuery,
} from '@codelab/codegen/hasura'
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
import { Spin } from 'antd'
import React, { useContext, useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeleteComponentElementFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentElementsForm = (
  props: DeleteComponentElementFormProps,
) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deleteComponentElementIds },
  } = useCRUDModalForm(EntityType.ComponentElement)

  const { component } = useContext(ComponentContext)

  const [mutate, { loading: deleting }] = useDeleteComponentElementsMutation({
    refetchQueries: [
      refetchGetComponentDetailQuery({ componentId: component.id }),
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

  const componentElementsWhere = {
    _or: deleteComponentElementIds.map((id) => ({
      id: {
        _eq: id,
      },
    })),
  }

  const { data: componentElementsData, loading: loadingComponentElements } =
    useGetComponentElementsWhereQuery({
      variables: {
        where: componentElementsWhere,
      },
    })

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        where: componentElementsWhere,
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
        title: 'Error while deleting ComponentElements',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to delete component element "
        {componentElementsData?.component_element
          .map((componentElement) => componentElement.label)
          .join(',')}
        ?
      </h4>
      <AutoFields />
    </FormUniforms>
  )
}
