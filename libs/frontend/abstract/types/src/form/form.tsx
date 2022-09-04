import { Maybe } from '@codelab/shared/abstract/types'
import { CSSInterpolation } from '@emotion/serialize'
import { JSONSchemaType } from 'ajv'
import React from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { AutoFormProps, Bridge } from 'uniforms'
import { Callback } from '../utils'

export type FormProps<TData, TResponse = unknown> = {
  cssString?: CSSInterpolation
  /**
   * Called after a successful submit
   */
  onSubmitSuccess?: ArrayOrSingle<Callback<Awaited<TData>, void>>

  /**
   * Called after a failed submit
   */
  onSubmitError?: ArrayOrSingle<Callback<TResponse, void>>

  /**
   * Don't use `DeepPartial` even Uniform uses it
   */
  onSubmit: (model: TData) => Promise<TResponse | void>

  /**
   * Schema used for form generation.
   *
   * If you pass a schema object a default {@see Ajv} validator is created from it.
   *
   * Pass a Bridge to to customize the process of creating a bridge from a schema (custom validations, dynamic schema, etc)
   *  Pass either schema or bridge
   */
  schema: JSONSchemaType<TData> | Bridge
} & SubmitRef &
  /**
   * By limiting the interface surface area, we can more easily understand behavior by requiring the least features to complete our use cases
   */
  // We require the model since update & delete requires them
  Pick<AutoFormProps<TData>, 'model'> &
  // Then these are additional options
  Partial<Pick<AutoFormProps<TData>, 'autosave' | 'onChange' | 'onChangeModel'>>

/**
 * Use this to be able to hide the submit button and get a controller, which can trigger form submit.
 *
 * This is programmatically passed from ModalForm to the Form using cloneElement.
 *
 * Currently making it require since most forms use it, this way we don't have to create a separate type. Optional works too but we get less typing
 */
export interface SubmitRef {
  submitRef?: React.MutableRefObject<Maybe<SubmitController>> | undefined
}

/** This object is used to control form submission imperatively */
export interface SubmitController {
  submit: () => void
}
