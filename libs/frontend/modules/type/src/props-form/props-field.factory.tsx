import { PrimitiveTypeKind, TypeKind } from '@codelab/shared/abstract/codegen'
import { IAnyType, IField } from '@codelab/shared/abstract/core'
import { Completion } from '@codemirror/autocomplete'
import Form from 'antd/lib/form'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { makeCompletionOptionsFromObjectKeys } from './codemirror-extensions'
import { CodeMirrorField } from './CodeMirrorField'

/**
 * Creates a field for the props form given a specific type for the field
 */
export const propsFieldFactory = (
  field: IField,
  form: UseFormReturn,
  // the state object from where we will get the keys to make autocomplete options
  autocompleteContext: any,
) => {
  // For now - create a CodeMirror field for everything,
  // later we will add support for Selects, Checkboxes and a List field

  return (
    <Form.Item label={field.name}>
      <Controller
        control={form.control}
        name={field.key}
        render={({ field: { onChange, value, onBlur } }) => (
          <CodeMirrorField
            defaultCompletionOptions={makeCompletionOptionsFromType(
              field.type.current,
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

const makeCompletionOptionsFromType = (type: IAnyType): Array<Completion> => {
  if (
    type.kind === TypeKind.PrimitiveType &&
    type.primitiveKind === PrimitiveTypeKind.Boolean
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

  if (type.kind === TypeKind.EnumType) {
    return type.allowedValues.map((av) => ({
      type: 'variable',
      label: av.value,
      detail: av.name ?? undefined,
    }))
  }

  return []
}
