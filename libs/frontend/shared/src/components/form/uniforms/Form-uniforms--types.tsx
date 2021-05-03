import { FetchResult } from '@apollo/client'
import { JSONSchemaType } from 'ajv'
import React from 'react'
import { AutoFormProps, Bridge } from 'uniforms'
import { CallbackOrArrayOfCallbacks } from '../../../utils'
import { SubmitController } from '../json-schema'

export type FormUniformsProps<TData extends Record<string, unknown>> = {
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

  schema: JSONSchemaType<TData> | Bridge
} & /** Props that get passed down to the AutoForm component */ Partial<
  Omit<AutoFormProps<TData>, 'schema'>
> &
  Pick<AutoFormProps<TData>, 'onSubmit'>
