import {
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
  | 'monaco'

export const FIELD_TYPE = {
  INPUT: 'input' as FieldType,
  NUMBER_INPUT: 'number' as FieldType,
  SELECT: 'select' as FieldType,
  MULTISELECT: 'multiselect' as FieldType,
  TAGS: 'tags' as FieldType,
  RADIO: 'radio' as FieldType,
  DATE: 'date' as FieldType,
  MONACO: 'monaco' as FieldType,
  CODE_MIRROR_GRAPHQL: 'code_mirror_graphql' as FieldType,
}

export type FormFieldOptions = { label?: string }

export type FormInputOptions = FormFieldOptions & { type?: FieldType }

export type FormFieldValueOptions = FormInputOptions & {
  value: string | number | Array<string>
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
