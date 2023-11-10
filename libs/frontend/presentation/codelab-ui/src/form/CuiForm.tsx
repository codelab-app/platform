import { StyleProvider } from '@ant-design/cssinjs'
import Form, { Theme as AntDTheme } from '@rjsf/antd'
import type { FormProps } from '@rjsf/core'
import { ThemeProps, withTheme } from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import React from 'react'

const ThemedForm = withTheme(AntDTheme)

export const CuiForm = (props: FormProps) => {
  const { onChange, onError, onSubmit, schema } = props

  console.log(schema)

  return (
    // <StyleProvider>
    <Form
      // onChange={onChange}
      // onError={onError}
      // onSubmit={onSubmit}
      schema={schema}
      validator={validator}
    />
    // </StyleProvider>
  )
}
