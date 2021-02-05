import { FetchResult } from '@apollo/client'
import { FormProps as RjsfFormProps } from '@rjsf/core'
import { ButtonProps } from 'antd/lib/button'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { SubmitController } from './JsonSchemaForm-ref'
import { CallbackOrArrayOfCallbacks } from 'libs/frontend/src/utils'

export interface JsonSchemaFormEvent<TData> {
  data: TData
}

export type JsonSchemaUseCaseFormProps<TData extends object> = Omit<
  JsonSchemaFormProps<TData>,
  'onChange' | 'schema' | 'formData' | 'onSubmit'
>

export interface JsonSchemaFormProps<TData extends object> {
  /** Use this to control the form data */
  initialFormData: TData
  /** Schema used for form generation */
  schema: JSONSchema7
  /** Called when form is submitted */
  onSubmit: (submitEvent: JsonSchemaFormEvent<TData>) => any
  // /** Called when any of the form values have changed */
  // onChange: (changeEvent: JsonSchemaFormEvent<TData>) => any
  /** Pass false to hide the submit button inside the form. Use the submitRef to control form submission */
  hideSubmitButton?: boolean
  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitRef?: React.MutableRefObject<SubmitController | undefined>
  /** Props that get passed down to the submit button */
  submitButtonProps?: Omit<ButtonProps, 'htmlType' | 'ref'>
  /** Props that get passed down to the RJSFForm component */
  rjsfFormProps?: Omit<RjsfFormProps<TData>, keyof JsonSchemaFormProps<TData>>
  /** Called after a successful mutation */
  onSubmitSuccess?: CallbackOrArrayOfCallbacks<FetchResult<any>>
  /** Called after a failed mutation */
  onSubmitError?: CallbackOrArrayOfCallbacks<any>
}
