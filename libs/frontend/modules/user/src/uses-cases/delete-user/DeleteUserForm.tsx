import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store/userState'

export const DeleteUserForm = (
  props: Omit<FormUniformsProps<EmptyJsonSchemaType>, 'schema'>,
) => {
  const usernames = useSelector(
    (state) => selectUser(state).deleteMetadata?.userNames,
  )

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to delete Users {usernames || ''}?</h4>
    </FormUniforms>
  )
}
