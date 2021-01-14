import { JSONSchema7 } from 'json-schema'
import React from 'react'
import GeneratedXStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedXStateForm'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { LoginUserInputSchema } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput.generated'
import { useUserMachine } from '../../store'

export type LoginUserFormProps = Omit<
  GeneratedXStateFormProps<LoginUserInput, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent'
>

export const LoginUserForm = (props: LoginUserFormProps) => {
  const user = useUserMachine()

  return (
    <GeneratedXStateForm<LoginUserInput, any>
      schema={LoginUserInputSchema as JSONSchema7}
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
