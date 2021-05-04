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
  LibraryExplorerGql,
  useDeleteComponentsWhereMutation,
  useGetComponentsWhereQuery,
} from '@codelab/hasura'
import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { AutoFields } from 'uniforms-antd'

type DeleteComponentFormProps = UniFormUseCaseProps<EmptyJsonSchemaType>

export const DeleteComponentsForm = (props: DeleteComponentFormProps) => {
  const {
    reset,
    setLoading,
    state: { deleteIds: deleteComponentIds },
  } = useCRUDModalForm(EntityType.Component)

  const [mutate, { loading: deleting }] = useDeleteComponentsWhereMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: LibraryExplorerGql,
      },
    ],
  })

  const componentsWhere = {
    _or: deleteComponentIds.map((id) => ({
      id: {
        _eq: id,
      },
    })),
  }

  useEffect(() => {
    setLoading(deleting)
  }, [deleting])

  const { data, loading } = useGetComponentsWhereQuery({
    variables: {
      where: componentsWhere,
    },
  })

  if (loading) {
    return <Spin />
  }

  const onSubmit = () => {
    return mutate({
      variables: {
        where: componentsWhere,
      },
    })
  }

  const componentLabels = data?.component
    .map((component) => component.label)
    .join(', ')

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
      <h4>Are you sure you want to delete component "{componentLabels}"?</h4>
      <AutoFields />
    </FormUniforms>
  )
}
