import { FetchResult } from '@apollo/client'
import React from 'react'
import { Bridge } from 'uniforms/es5'
import { AutoFormProps } from 'uniforms/es5/AutoForm'
import { SubmitController } from '../json-schema'
import { CallbackOrArrayOfCallbacks } from 'libs/frontend/src/utils'

export type JsonSchemaUniFormProps<TData extends object> = {
  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitRef?: React.MutableRefObject<SubmitController | undefined>

  /** Called after a successful submit */
  onSubmitSuccess?: CallbackOrArrayOfCallbacks<FetchResult<any>>

  /** Called after a failed submit */
  onSubmitError?: CallbackOrArrayOfCallbacks<any>

  /** Schema used for form generation.
   * If you pass a schema object a default {@see Ajv} validator is created from it.
   * Pass a Bridge to to customize the process of creating a bridge from a schema (custom validations, dynamic schema, etc)
   *  Pass either schema or bridge
   */
  schema: object | Bridge
} & /** Props that get passed down to the AutoForm component */ Omit<
  Partial<AutoFormProps<TData>>,
  'schema'
> &
  Pick<AutoFormProps<TData>, 'onSubmit'>
