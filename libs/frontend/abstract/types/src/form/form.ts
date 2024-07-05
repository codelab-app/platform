import type { Callback, Maybe } from '@codelab/shared/abstract/types'
import type { TSchema } from '@sinclair/typebox'
import type { JSONSchemaType } from 'ajv'
import type React from 'react'
import type { DefaultValues, FieldValues } from 'react-hook-form'
import type { ArrayOrSingle } from 'ts-essentials'
import type { AutoFormProps, Bridge, UnknownObject } from 'uniforms'
import type { ModelActionKey } from '../model'

export type VoidCallback<TInput> = Callback<TInput, void>

export type FormProps<
  TData extends UnknownObject,
  TResponse = unknown,
> = Partial<
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
    uiKey: ModelActionKey

// Form Controller props
export interface FormController {
  submitLabel: string
  onCancel?(): void
}

/**
 * Use this to be able to hide the submit button and get a controller, which can trigger form submit.
 *
 * This is programmatically passed from ModalForm to the Form using cloneElement.
 *
 * Currently making it required since most forms use it, this way we don't have to create a separate type. Optional works too but we get less typing
 */
export interface SubmitRef {
  submitRef?: React.MutableRefObject<Maybe<SubmitController>> | undefined
}

/** This object is used to control form submission imperatively */
export interface SubmitController {
  submit(): void
  validate?(): void
}
