import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { CreateAppInput } from '../../../../app/src/core/application/useCases/createApp/CreateAppInput'
import { CreateAppInputSchema } from '../../../../app/src/core/application/useCases/createApp/CreateAppInput.generated'
import { useAppMachine } from '../../model'

const Form = withTheme(AntDTheme)

// This, LoginForm and RegisterForm are very similar, if we create more similar forms, maybe
// it's a good idea to create a generic modal form
export const CreateAppForm = ({
  formId,
  hasSubmitButton,
  submitBtnRef,
}: {
  formId?: string
  hasSubmitButton?: boolean
  submitBtnRef?: React.RefObject<HTMLButtonElement>
}) => {
  const app = useAppMachine()

  const onSubmit = ({ formData }: any) => {
    app.send({
      type: 'ON_SUBMIT',
      data: formData,
    })
  }

  // The state is needed, because the rjsf doesn't keep any state. Every time this re-renders, the input values get lost
  const [formData, setFormData] = useState<CreateAppInput>({
    title: '',
  })

  return (
    <Form
      id={formId}
      schema={CreateAppInputSchema as JSONSchema7}
      onSubmit={onSubmit}
      onChange={(e) => setFormData(e.formData)}
      formData={formData}
    >
      {/* This button exists because by default the Form from rjsf includes a submit button.
       Since we don't want to use it and we want to submit with the modal button, we need to hide it.
       So if we add our own button and hide it with display: none, it works */}
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
