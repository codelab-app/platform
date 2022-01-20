import { FormProps } from '@codelab/frontend/abstract/props'
import { EmptyJsonSchemaType } from '@codelab/frontend/view/components'
import { UserStateDeletePayload } from '../../store'

export type DeleteUserButtonProps = {
  payload: UserStateDeletePayload
}

export type DeleteUserFromProps = Omit<FormProps<EmptyJsonSchemaType>, 'schema'>
