import React from 'react'
import { CuiForm } from './CuiForm'
import { CuiInput } from './CuiInput'

const SignupForm = () => {
  return (
    <CuiForm
      defaultValues={{}}
      onSubmit={() => {
        //
      }}
    >
      <CuiInput name="firstname" />
      <CuiInput name="lastname" />
    </CuiForm>
  )
}

export default {
  component: CuiForm,
  title: 'CUI Form',
}

export const Default = {
  args: {},
  render: () => <SignupForm />,
}
