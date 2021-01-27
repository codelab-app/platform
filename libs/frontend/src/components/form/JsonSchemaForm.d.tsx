import { FormProps as RjsfFormProps } from '@rjsf/core'
import { ButtonProps } from 'antd/lib/button'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { SubmitController } from './JsonSchemaForm-ref'

export interface JsonSchemaFormEvent<TFormData> {
  data: TFormData
}

export interface JsonSchemaFormProps<TFormData extends object> {
  /** Schema used for form generation */
  schema: JSONSchema7
  /** Called when form is submitted */
  onSubmit: (submitEvent: JsonSchemaFormEvent<TFormData>) => any
  /** Called when any of the form values have changed */
  onChange: (changeEvent: JsonSchemaFormEvent<TFormData>) => any
  /** Use this to control the form data */
  formData: TFormData
  /** Pass false to hide the submit button inside the form. Use the submitControllerRef to control form submission */
  hideSubmitButton?: boolean
  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitControllerRef?: React.MutableRefObject<SubmitController | undefined>
  /** Props that get passed down to the submit button */
  submitButtonProps?: Omit<ButtonProps, 'htmlType' | 'ref'>
  /** Props that get passed down to the RJSFForm component */
  rjsfFormProps?: Omit<
    RjsfFormProps<TFormData>,
    keyof JsonSchemaFormProps<TFormData>
  >
}
