import {
  IAnyType,
  IField,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { toTitleCase } from '@codelab/shared/utils'
import { Completion } from '@codemirror/autocomplete'
import Form from 'antd/lib/form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { makeCompletionOptionsFromObjectKeys } from './codemirror-extensions'
import { CodeMirrorField } from './CodeMirrorField'

type PropsFieldFactoryProps = {
  field: IField
  form: UseFormReturn
  // the state object from where we will get the keys to make autocomplete options
  autocompleteContext: any
}

/**
 * Creates a field for the props form given a specific type for the field
 */
export const PropsFields = observer<PropsFieldFactoryProps>(
  ({
    field,
    form,
    // the state object from where we will get the keys to make autocomplete options
    autocompleteContext,
  }) => {
    // For now - create a CodeMirror field for everything,
    // later we will add support for Selects, Checkboxes and a List field

    const reactNodeOptions = [{ id: '0x', name: 'test' }].map((element) => {
      return {
        label: element.id,
        detail: element.name ?? '',
        // label: element.name ?? '',
        // value: element.id,
      }
    })

    return (
      <Form.Item label={field.name || toTitleCase(field.key)}>
        <Controller
          control={form.control}
          name={field.key}
          render={({ field: itemField }) => {
            console.log(itemField)

            const { onBlur, onChange, value } = itemField

            return (
              <CodeMirrorField
                defaultCompletionOptions={makeCompletionOptionsFromType(
                  field.type.current,
                  reactNodeOptions,
                )}
                onBlur={onBlur}
                onChange={onChange}
                templateCompletionOptions={makeCompletionOptionsFromObjectKeys(
                  autocompleteContext,
                )}
                value={value}
              />
            )
          }}
        />
      </Form.Item>
    )
  },
)

const makeCompletionOptionsFromType = (
  type: IAnyType,
  reactNodeOptions: Array<{ label: string; detail: string }> = [],
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
    return reactNodeOptions
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
