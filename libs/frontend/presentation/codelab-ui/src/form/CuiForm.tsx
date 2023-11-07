import { StyleProvider } from '@ant-design/cssinjs'
import { Theme as AntDTheme } from '@rjsf/antd'
import type { FormProps } from '@rjsf/core'
import Form, { ThemeProps, withTheme } from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import React from 'react'

const ThemedForm = withTheme(AntDTheme)

export const CuiForm = (props: FormProps) => {
  const { onChange, onError, onSubmit, schema } = props

  return (
    // <StyleProvider>
    <ThemedForm
      // onChange={onChange}
      // onError={onError}
      // onSubmit={onSubmit}
      schema={schema}
      validator={validator}
    />
    // </StyleProvider>
  )
}
