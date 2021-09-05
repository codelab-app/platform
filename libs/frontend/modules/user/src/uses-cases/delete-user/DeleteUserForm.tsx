import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import React from 'react'
import { refetchGetUsersQuery } from '../get-users/GetUsers.api.graphql.gen'
import { useDeleteUserMutation } from './DeleteUser.api.graphql.gen'

export const DeleteUserForm = (
  props: UniFormUseCaseProps<EmptyJsonSchemaType>,
) => {
  const { reset, state } = useCrudModalForm(EntityType.Atom)

  const [mutate] = useDeleteUserMutation({
    refetchQueries: [refetchGetUsersQuery()],
  })

  const onSubmit = async () => {
    for (const id of state.deleteIds) {
      await mutate({
        variables: { input: { userId: id } },
      })
    }
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
        Are you sure you want to delete Users {state.metadata?.userNames || ''}?
      </h4>
    </FormUniforms>
  )
}
