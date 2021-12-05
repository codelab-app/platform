import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  FormUniforms,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useUserState } from '../../hooks'
import { DeleteUserFromProps } from './types'

export const DeleteUserForm = (props: DeleteUserFromProps) => {
  const { deleteMetadata } = useUserState()
  const { userNames } = deleteMetadata || { userNames: '' }

  return (
    <FormUniforms<EmptyJsonSchemaType> schema={emptyJsonSchema} {...props}>
      <h4>Are you sure you want to delete Users {userNames}?</h4>
    </FormUniforms>
  )
}
