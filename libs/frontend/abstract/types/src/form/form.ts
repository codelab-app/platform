import type { Maybe } from '@codelab/shared/abstract/types'
import type { JSONSchemaType } from 'ajv'
import type React from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { AutoFormProps, Bridge } from 'uniforms'
import type { Callback } from '../utils'

export type VoidCallback<TInput> = ArrayOrSingle<Callback<TInput, void>>

export type FormProps<TData, TResponse = unknown> = Partial<
  Pick<
    AutoFormProps<TData>,
    'autosave' | 'modelTransform' | 'onChange' | 'onChangeModel' | 'submitField'
  >
> &
  Pick<AutoFormProps<TData>, 'model'> &
  SubmitRef & {
    /**
     * For testing
     */
    'data-testid'?: string

    cssString?: string
    /**
     * Don't use `DeepPartial` even Uniform uses it
     */
    onSubmit(model: TData): Promise<TResponse | void>

    /**
     * Called after a failed submit, the input is unknown error
     */
    onSubmitError?: VoidCallback<unknown>

    /**
     * Called after a successful submit
     */
    onSubmitSuccess?: VoidCallback<TResponse>

    /**
     * Schema used for form generation.
     *
     * If you pass a schema object a default {@see Ajv} validator is created from it.
     *
     * Pass a Bridge to to customize the process of creating a bridge from a schema (custom validations, dynamic schema, etc)
     *  Pass either schema or bridge
     */
    schema: Bridge | JSONSchemaType<TData>
  }

// form Controller props
export interface formController {
  submitLabel: string
  onCancel(): void
}

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
  submit(): void
}
