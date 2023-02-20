import type {
  expectFormFieldError,
  expectFormFields,
  expectFormFieldValue,
  setFormFieldValue,
  setFormFieldValues,
} from './form.commands'

type FieldType =
  | 'input'
  | 'number'
  | 'select'
  | 'multiselect'
  | 'tags'
  | 'radio'
  | 'date'
  | 'codeMirror'
  | 'toggle'

export enum FIELD_TYPE {
  INPUT = 'input',
  NUMBER_INPUT = 'number',
  SELECT = 'select',
  MULTISELECT = 'multiselect',
  TAGS = 'tags',
  RADIO = 'radio',
  DATE = 'date',
  CODE_MIRROR = 'codeMirror',
  TOGGLE = 'toggle',
}

export interface FormFieldOptions {
  label?: string
}

export type FormInputOptions = FormFieldOptions & { type?: FieldType }

export type FormFieldValueOptions = FormInputOptions & {
  value: string | number | Array<string> | boolean
  placeholder?: string
  scrollIntoView?: boolean
}

export type ExpectFormFieldValueArgs = Parameters<typeof expectFormFieldValue>

export type ExpectFormFieldErrorArgs = Parameters<typeof expectFormFieldError>

export type FormFieldValueOrErrorOptions = Partial<
  { error?: string } & FormFieldValueOptions
>

export type ExpectFormFieldsArgs = Parameters<typeof expectFormFields>

export type ScrollPosition = 'top' | 'bottom' | number

export type SetFormFieldValueArgs = Parameters<typeof setFormFieldValue>

export type SetFormFieldValuesArgs = Parameters<typeof setFormFieldValues>
