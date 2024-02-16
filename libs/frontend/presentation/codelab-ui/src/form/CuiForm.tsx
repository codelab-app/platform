import { StyleProvider } from '@ant-design/cssinjs'
import Form, { Theme as AntDTheme } from '@rjsf/antd'
import type { FormProps } from '@rjsf/core'
import { withTheme } from '@rjsf/core'
import validator from '@rjsf/validator-ajv8'
import { Button } from 'antd'
import merge from 'lodash/merge'
import React from 'react'
import { extractUiSchema } from './extract-ui-schema'

const ThemedForm = withTheme(AntDTheme)

export const CuiForm = (props: FormProps) => {
  const { onChange, onError, onSubmit, schema, uiSchema = {} } = props
  const extractedUiSchema = extractUiSchema(schema)

  return (
    <StyleProvider>
      <Form
        // onChange={onChange}
        // onError={onError}
        // onSubmit={onSubmit}
        schema={schema}
        uiSchema={merge(extractedUiSchema, uiSchema)}
        validator={validator}
      >
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
        <Button htmlType="button">Cancel</Button>
      </Form>
    </StyleProvider>
  )
}
