import React, { useState } from 'react'
import { JsonSchemaForm } from '../../../../../frontend/src/components/form/json-schema/JsonSchemaForm'
import { RegisterUserInput } from '../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'
import { useUserMachine } from '../../store'
import {
  JsonSchemaFormEvent,
  JsonSchemaUseCaseFormProps,
} from '@codelab/frontend'
import { RegisterUserInputSchema } from '@codelab/generated'

export const RegisterUserForm = (
  props: JsonSchemaUseCaseFormProps<RegisterUserInput>,
) => {
  const user = useUserMachine()

  const [formData, setFormData] = useState<RegisterUserInput>({
    email: '',
    password: '',
  })

  const handleSubmit = ({ data }: JsonSchemaFormEvent<RegisterUserInput>) =>
    user.send({
      type: 'ON_SUBMIT',
      data,
    })

  return (
    <JsonSchemaForm<RegisterUserInput>
      schema={RegisterUserInputSchema}
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
