import type {
  Callback,
  Maybe,
  ObjectLike,
} from '@codelab/shared-abstract-types'
import type { Completion } from '@codemirror/autocomplete'
import type { TSchema } from '@sinclair/typebox'
import type { JSONSchemaType } from 'ajv'
import type { AutoFormProps, Bridge } from 'uniforms'

import type { UiKey } from '../model'

export type VoidCallback<TInput> = Callback<TInput, void>

export type FormProps<TData extends ObjectLike, TResponse = unknown> = Partial<
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
    disabled?: boolean
    uiKey: UiKey
    cssString?: string
    /**
     * For showing skeleton
     */
    isLoading?: boolean
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
    schema: Bridge | JSONSchemaType<TData> | TSchema
    errorMessage?: string
    successMessage?: string
    /**
     * Don't use `DeepPartial` even thought Uniform uses it
     */
    onSubmit(model?: TData): Promise<TResponse>
    onSubmitOptimistic?(): void
  }

// form Controller props
export interface formController {
  submitLabel: string
  onCancel?(): void
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
  validate?(): void
}

/**
 * A form style where the submit button is outside of the form, such as popover forms
 *
 * This creates a wrapper around our form component
 */
export interface IFormController {
  showFormControl?: boolean
  submitRef?: React.MutableRefObject<Maybe<SubmitController>>
  onSubmitSuccess?(): void
}

export type ITypeModelUniformSchemaBuilder<IType> = (
  type: IType,
  autocomplete?: Array<Completion>,
) => { uniforms: ObjectLike }
