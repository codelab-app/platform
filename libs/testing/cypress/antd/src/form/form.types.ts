import type {
  expectFormFieldError,
  expectFormFields,
  expectFormFieldValue,
  setFormFieldValue,
  setFormFieldValues,
} from './form.commands'

type FieldType =
  | 'codeMirror'
  | 'date'
  | 'input'
  | 'multiselect'
  | 'number'
  | 'radio'
  | 'select'
  | 'tags'
  | 'toggle'

export enum FIELD_TYPE {
  CODE_MIRROR = 'codeMirror',
  DATE = 'date',
  INPUT = 'input',
  MULTISELECT = 'multiselect',
  NUMBER_INPUT = 'number',
  RADIO = 'radio',
  SELECT = 'select',
  TAGS = 'tags',
  TOGGLE = 'toggle',
}

export interface FormFieldOptions {
  label?: string
}

export type FormInputOptions = FormFieldOptions & { type?: FieldType }

export type FormFieldValueOptions = FormInputOptions & {
  placeholder?: string
  scrollIntoView?: boolean
  value: Array<string> | boolean | number | string
}

export type ExpectFormFieldValueArgs = Parameters<typeof expectFormFieldValue>

export type ExpectFormFieldErrorArgs = Parameters<typeof expectFormFieldError>

export type FormFieldValueOrErrorOptions = Partial<
  FormFieldValueOptions & { error?: string }
>

export type ExpectFormFieldsArgs = Parameters<typeof expectFormFields>

export type ScrollPosition = number | 'bottom' | 'top'

export type SetFormFieldValueArgs = Parameters<typeof setFormFieldValue>

export type SetFormFieldValuesArgs = Parameters<typeof setFormFieldValues>
