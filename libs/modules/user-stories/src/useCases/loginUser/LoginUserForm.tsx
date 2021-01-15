import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import GeneratedForm, {
  GeneratedFormEvent,
  GeneratedFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedForm'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { LoginUserInputSchema } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput.generated'
import { useUserMachine } from '../../store'

export type LoginUserFormProps = Omit<
  GeneratedFormProps<LoginUserInput>,
  'onChange' | 'schema' | 'formData' | 'onSubmit'
>

export const LoginUserForm = (props: LoginUserFormProps) => {
  const user = useUserMachine()

  const [formData, setFormData] = useState<LoginUserInput>({
    email: '',
    password: '',
  })

  const handleSubmit = ({ data }: GeneratedFormEvent<LoginUserInput>) =>
    user.send({
      type: 'ON_SUBMIT',
      data,
    })

  return (
    <GeneratedForm<LoginUserInput>
      schema={LoginUserInputSchema as JSONSchema7}
      rjsfFormProps={{
        uiSchema: {
          password: {
            'ui:widget': 'password',
          },
        },
      }}
      formData={formData}
      onChange={({ data }) => setFormData(data)}
      onSubmit={handleSubmit}
      {...props}
    />
  )
}
