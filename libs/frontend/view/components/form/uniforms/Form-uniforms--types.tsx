import { FetchResult } from '@apollo/client'
import { Callback } from '@codelab/frontend/shared/utils'
import { Maybe, MaybeArray } from '@codelab/shared/abstract/types'
import { JSONSchemaType } from 'ajv'
import React from 'react'
import { AutoFormProps, Bridge } from 'uniforms'
import { SubmitController } from './submitController'

export type ModalFormProps<TData> = {
  /** Use this to be able to hide the submit button and get a controller, which can trigger form submit */
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>

  /** Called after a successful submit */
  onSubmitSuccess?: MaybeArray<Maybe<Callback<FetchResult<any>>>>

  /** Called after a failed submit */
  onSubmitError?: MaybeArray<Maybe<Callback<any>>>

  onSubmit: (model: TData) => void | Promise<any>
}

export type FormUniformsProps<TData> = ModalFormProps<TData> & {
  /** Schema used for form generation.
   * If you pass a schema object a default {@see Ajv} validator is created from it.
   * Pass a Bridge to to customize the process of creating a bridge from a schema (custom validations, dynamic schema, etc)
   *  Pass either schema or bridge
   */

  schema: JSONSchemaType<TData> | Bridge
} & /** Props that get passed down to the AutoForm component */ Partial<
    Omit<AutoFormProps<TData>, 'schema' | 'onSubmit'>
  >
// Pick<AutoFormProps<TData>, 'onSubmit'>
//

/**
 * Read to use form, can be used with modal or standalone
 */
export type UniFormUseCaseProps<TData> = React.PropsWithChildren<
  Partial<
    Pick<
      FormUniformsProps<TData>,
      'onSubmitError' | 'onSubmitSuccess' | 'submitRef' | 'autosave'
    >
  >
>
