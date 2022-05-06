import {
  IAnyType,
  IField,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Completion } from '@codemirror/autocomplete'
import Form from 'antd/lib/form'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useGetAllAtoms } from '../interface-form'
import { makeCompletionOptionsFromObjectKeys } from './codemirror-extensions'
import { CodeMirrorField } from './CodeMirrorField'

/**
 * Creates a field for the props form given a specific type for the field
 */
export const PropsFieldFactory = (
  field: IField,
  form: UseFormReturn,
  // the state object from where we will get the keys to make autocomplete options
  autocompleteContext: any,
) => {
  // For now - create a CodeMirror field for everything,
  // later we will add support for Selects, Checkboxes and a List field
  const { data, atomOptions } = useGetAllAtoms()

  return (
    <Form.Item label={field.name}>
      <Controller
        control={form.control}
        name={field.key}
        render={({ field: { onChange, value, onBlur } }) => (
          <CodeMirrorField
            defaultCompletionOptions={makeCompletionOptionsFromType(
              field.type.current,
              atomOptions,
            )}
            onBlur={onBlur}
            onChange={onChange}
            templateCompletionOptions={makeCompletionOptionsFromObjectKeys(
              autocompleteContext,
            )}
            value={value}
          />
        )}
      />
    </Form.Item>
  )
}

const makeCompletionOptionsFromType = (
  type: IAnyType,
  atomOptions: Array<{ label: string; value: string }> = [],
): Array<Completion> => {
  if (
    type.kind === ITypeKind.PrimitiveType &&
    type.primitiveKind === IPrimitiveTypeKind.Boolean
  ) {
    return [
      {
        label: 'true',
        type: 'primitive',
      },
      {
        label: 'false',
        type: 'primitive',
      },
    ]
  }

  if (type.kind === ITypeKind.ReactNodeType) {
    return atomOptions
  }

  if (type.kind === ITypeKind.EnumType) {
    return type.allowedValues.map((av) => ({
      type: 'variable',
      label: av.value,
      detail: av.name ?? undefined,
    }))
  }

  return []
}
