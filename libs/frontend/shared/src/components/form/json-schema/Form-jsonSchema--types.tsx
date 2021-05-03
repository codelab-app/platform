import { FetchResult } from '@apollo/client'
import { CallbackOrArrayOfCallbacks } from '@codelab/frontend/shared'
import { FormProps as RjsfFormProps, ISubmitEvent } from '@rjsf/core'
import { ButtonProps } from 'antd/lib/button'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { SubmitController } from './Form-jsonSchema--ref'

export type OnSubmitEvent<TData = any> = Pick<ISubmitEvent<TData>, 'formData'> &
  Partial<Omit<ISubmitEvent<TData>, 'formData'>>

export type JsonSchemaFormProps<TData extends Record<string, unknown>> = {
  //
  // REQUIRED
  //

  /** Use this to control the form data */
  initialFormData?: TData

  /** Schema used for form generation */
  schema: JSONSchema7

  widgets?: any

  /** Called when form is submitted */
  onSubmit?: (submitEvent: OnSubmitEvent<TData>) => any

  //
  // OPTIONAL
  //

  /** Pass false to hide the submit button inside the form. Use the submitRef to control form submission */
  hideSubmitButton?: boolean

  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitRef?: React.MutableRefObject<SubmitController | undefined>

  /** Props that get passed down to the submit button */
  submitButtonProps?: Omit<ButtonProps, 'htmlType' | 'ref'>

  /** Called after a successful mutation */
  onSubmitSuccess?: CallbackOrArrayOfCallbacks<FetchResult<any>>

  /** Called after a failed mutation */
  onSubmitError?: CallbackOrArrayOfCallbacks<any>

  /** Auto save form on change */
  saveOnChange?: boolean
} & /** Props that get passed down to the RJSFForm component */ Omit<
  RjsfFormProps<TData>,
  | 'initialFormData'
  | 'schema'
  | 'widgets'
  | 'onSubmit'
  | 'hideSubmitButton'
  | 'submitRef'
  | 'submitButtonProps'
>
