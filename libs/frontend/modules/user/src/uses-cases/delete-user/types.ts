import {
  EmptyJsonSchemaType,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { UserStateDeletePayload } from '../../store'

export type DeleteUserButtonProps = {
  payload: UserStateDeletePayload
}

export type DeleteUserFromProps = Omit<
  FormUniformsProps<EmptyJsonSchemaType>,
  'schema'
>
