import { JSONSchema7 } from 'json-schema'
import React from 'react'
import GeneratedXStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedXStateForm'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { RegisterUserInputSchema } from '../../../../user/src/core/application/useCases/registerUser'
import { useUserMachine } from '../../store'

export type RegisterUserFormProps = Omit<
  GeneratedXStateFormProps<LoginUserInput, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent'
>

export const RegisterUserForm = (props: RegisterUserFormProps) => {
  const user = useUserMachine()

  return (
    <GeneratedXStateForm<LoginUserInput, any>
      schema={RegisterUserInputSchema as JSONSchema7}
      rjsfFormProps={{
        uiSchema: {
          password: {
            'ui:widget': 'password',
          },
        },
      }}
      send={user.send}
      createSubmitEvent={({ data }) => {
        return {
          type: 'ON_SUBMIT',
          data,
        }
      }}
      {...props}
    />
  )
}
