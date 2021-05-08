import {
  refetchGetAllUsersQuery,
  useDeleteUserWhereMutation,
  useGetUsersWhereQuery,
} from '@codelab/dgraph'
import {
  createNotificationHandler,
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { Spin } from 'antd'
import React from 'react'

export const DeleteUserForm = (
  props: UniFormUseCaseProps<EmptyJsonSchemaType>,
) => {
  const { reset, setLoading, state } = useCRUDModalForm(EntityType.Atom)

  const [mutate] = useDeleteUserWhereMutation({
    awaitRefetchQueries: true,
    refetchQueries: [refetchGetAllUsersQuery()],
  })

  const onSubmit = () => {
    return mutate({
      variables: {
        where: {
          id: state.deleteIds,
        },
      },
    })
  }

  const { data, loading } = useGetUsersWhereQuery({
    variables: {
      where: {
        id: state.deleteIds,
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
        {data?.queryUser?.map((user) => user?.email).join(',')}"?
      </h4>
    </FormUniforms>
  )
}
