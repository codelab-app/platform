import React, { useState } from 'react'
import { JsonSchemaForm } from '../../../../../frontend/src/components/form/json-schema/JsonSchemaForm'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { useUserMachine } from '../../store'
import { JsonSchemaUseCaseFormProps } from '@codelab/frontend'
import { LoginUserInputSchema } from '@codelab/generated'
import { JsonSchemaFormEvent } from 'libs/frontend/src/components/form/json-schema/JsonSchemaForm.d'

export const LoginUserForm = (
  props: JsonSchemaUseCaseFormProps<LoginUserInput>,
) => {
  const user = useUserMachine()

  const [formData, setFormData] = useState<LoginUserInput>({
    email: '',
    password: '',
  })

  const handleSubmit = ({ data }: JsonSchemaFormEvent<LoginUserInput>) =>
    user.send({
      type: 'ON_SUBMIT',
      data,
    })

  return (
    <JsonSchemaForm<LoginUserInput>
      schema={LoginUserInputSchema}
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
