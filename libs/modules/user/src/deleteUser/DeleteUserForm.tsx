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
  refetchGetUsersQuery,
  useDeleteUsersMutation,
  useGetUsersQuery,
} from '@codelab/graphql'
import { Spin } from 'antd'
import React from 'react'

export const DeleteUserForm = (
  props: UniFormUseCaseProps<EmptyJsonSchemaType>,
) => {
  const { reset, state } = useCRUDModalForm(EntityType.Atom)

  const [mutate] = useDeleteUsersMutation({
    refetchQueries: [refetchGetUsersQuery()],
  })

  const onSubmit = () => {
    return mutate({
      variables: { input: { ids: state.deleteIds } },
    })
  }

  const { data, loading } = useGetUsersQuery({
    variables: {
      input: {
        userIds: state.deleteIds,
      },
    },
  })

  if (loading) {
    return <Spin />
  }

  return (
    <FormUniforms<EmptyJsonSchemaType>
      onSubmit={onSubmit}
      schema={emptyJsonSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while deleting ComponentElements',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <h4>
        Are you sure you want to delete Users "
        {data?.users?.map((user) => user?.email).join(',')}"?
      </h4>
    </FormUniforms>
  )
}
