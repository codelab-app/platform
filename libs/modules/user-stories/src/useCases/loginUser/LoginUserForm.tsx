import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { JsonSchemaForm } from '../../../../../frontend/src/components/form/JsonSchemaForm'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { LoginUserInputSchema } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput.generated'
import { useUserMachine } from '../../store'
import { ModalFormProps } from '@codelab/frontend'
import { JsonSchemaFormEvent } from 'libs/frontend/src/components/form/JsonSchemaForm.d'

export const LoginUserForm = (props: ModalFormProps<LoginUserInput>) => {
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
