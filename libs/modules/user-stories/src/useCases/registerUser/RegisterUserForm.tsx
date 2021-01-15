import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import GeneratedForm, {
  GeneratedFormEvent,
  GeneratedFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedForm'
import { RegisterUserInputSchema } from '../../../../user/src/core/application/useCases/registerUser'
import { RegisterUserInput } from '../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { useUserMachine } from '../../store'

export type RegisterUserFormProps = Omit<
  GeneratedFormProps<RegisterUserInput>,
  'onChange' | 'schema' | 'formData' | 'onSubmit'
>

export const RegisterUserForm = (props: RegisterUserFormProps) => {
  const user = useUserMachine()

  const [formData, setFormData] = useState<RegisterUserInput>({
    email: '',
    password: '',
  })

  const handleSubmit = ({ data }: GeneratedFormEvent<RegisterUserInput>) =>
    user.send({
      type: 'ON_SUBMIT',
      data,
    })

  return (
    <GeneratedForm<RegisterUserInput>
      schema={RegisterUserInputSchema as JSONSchema7}
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
