import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { useUserMachine } from '../../store'
import { RegisterUserInputSchema } from '@codelab/modules/user'

export const RegisterUserForm = ({
  formId,
  hasSubmitButton = true,
}: {
  formId?: string
  hasSubmitButton?: boolean
}) => {
  const user = useUserMachine()

  const onSubmit = ({ formData }: any) => {
    user.send({
      type: 'ON_SUBMIT',
      data: formData,
    })
  }
  const Form = withTheme(AntDTheme)

  return (
    <Form
      id={formId}
      schema={RegisterUserInputSchema as JSONSchema7}
      uiSchema={{
        password: {
          'ui:widget': 'password',
        },
      }}
      // widgets={widgets}
      // formContext={formCtx}
      // onChange={filterOptions}
      onSubmit={onSubmit}
      // onError={log('errors')}
    />
  )
}
