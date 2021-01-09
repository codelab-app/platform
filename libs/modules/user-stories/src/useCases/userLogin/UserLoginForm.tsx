import { Theme as AntDTheme } from '@rjsf/antd'
import { ISubmitEvent, withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { LoginUserInputSchema } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput.generated'
import { LoginUserRequest } from '../../../../user/src/core/application/useCases/loginUser/LoginUserRequest'
import { useUserMachine } from '../../store'

const Form = withTheme(AntDTheme)

export const UserLoginForm = ({
  formId,
  hasSubmitButton = true,
  submitBtnRef,
}: {
  formId?: string
  hasSubmitButton?: boolean
  submitBtnRef?: React.RefObject<HTMLButtonElement>
}) => {
  const user = useUserMachine()

  const [formData, setFormData] = useState<LoginUserRequest>({
    email: '',
    password: '',
  })

  const onSubmit = (e: ISubmitEvent<any>) => {
    user.send({
      type: 'ON_SUBMIT',
      data: e.formData,
    })
  }

  return (
    <Form
      id={formId}
      schema={LoginUserInputSchema as JSONSchema7}
      uiSchema={{
        password: {
          'ui:widget': 'password',
        },
      }}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={onSubmit}
    >
      <button
        ref={submitBtnRef}
        type="submit"
        style={hasSubmitButton ? undefined : { display: 'none' }}
      >
        Submit
      </button>
    </Form>
  )
}
