// Only fix types declaration
import CheckboxGroup, {
  CheckboxGroupProps,
  CheckboxValueType,
} from 'antd/lib/checkbox/Group'
import { RadioGroupProps } from 'antd/lib/radio'
import RadioGroup from 'antd/lib/radio/group'
import SelectAntD, { SelectProps as SelectAntDProps } from 'antd/lib/select'
import React, { Ref } from 'react'
import { FieldProps } from 'uniforms'
import { SelectField as UniformsSelectField } from 'uniforms-antd'

type CheckboxesProps = FieldProps<
  SelectFieldValue,
  CheckboxGroupProps | RadioGroupProps,
  {
    allowedValues?: Array<CheckboxValueType>
    checkboxes: true
    disableItem?: (value: CheckboxValueType) => boolean
    inputRef?: Ref<typeof CheckboxGroup | typeof RadioGroup>
    required?: boolean
    transform?: (value: CheckboxValueType) => string
  }
>
type SelectProps = FieldProps<
  SelectFieldValue,
  SelectAntDProps<string | Array<string>>,
  {
    allowedValues?: Array<string>
    checkboxes?: false
    disableItem?: (value: CheckboxValueType) => boolean
    inputRef?: Ref<typeof SelectAntD>
    required?: boolean
    transform?: (value: string) => string
  }
>
type SelectFieldValue = CheckboxValueType | Array<string | undefined>
export type SelectFieldProps =
  | import('uniforms').Override<
      SelectProps,
      import('uniforms').Override<
        Partial<
          import('uniforms').GuaranteedProps<
            string | number | boolean | Array<string | undefined> | undefined
          >
        >,
        {
          label?: React.ReactNode
          name: string
          placeholder?: string | boolean | null | undefined
        }
      >
    >
  | import('uniforms').Override<
      CheckboxesProps,
      import('uniforms').Override<
        Partial<
          import('uniforms').GuaranteedProps<
            string | number | boolean | Array<string | undefined> | undefined
          >
        >,
        {
          label?: React.ReactNode
          name: string
          placeholder?: string | boolean | null | undefined
        }
      >
    >
export type FixedSelectFieldType = (
  props: SelectFieldProps,
) => JSX.Element & {
  Component: React.ComponentType<SelectFieldProps>
  options:
    | {
        initialValue?: boolean | undefined
        kind?: 'leaf' | 'node' | undefined
      }
    | undefined
}

export const SelectField = (UniformsSelectField as unknown) as FixedSelectFieldType
