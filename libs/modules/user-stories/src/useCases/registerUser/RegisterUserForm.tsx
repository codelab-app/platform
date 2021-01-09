import { Theme as AntDTheme } from '@rjsf/antd'
import { ISubmitEvent, withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { useUserMachine } from '../../store'
import { RegisterUserInputSchema } from '../../../../user/src/core/application/useCases/registerUser/RegisterUserInput.generated'
import { RegisterUserInput } from '../../../../user/src/core/application/useCases/registerUser/RegisterUserInput'

const Form = withTheme(AntDTheme)

export const RegisterUserForm = ({
  formId,
  hasSubmitButton,
  submitBtnRef,
}: {
  formId?: string
  hasSubmitButton?: boolean
  submitBtnRef?: React.RefObject<HTMLButtonElement>
}) => {
  const user = useUserMachine()

  // TODO: register fields are not required, perhaps find a way to make them required in the schema through the generator
  const [formData, setFormData] = useState<RegisterUserInput>({
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
      schema={RegisterUserInputSchema as JSONSchema7}
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
