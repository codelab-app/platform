import { DeleteFilled, PlusOutlined } from '@ant-design/icons'
import {
  IAnyType,
  IField,
  IPrimitiveTypeKind,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { toTitleCase } from '@codelab/shared/utils'
import { Completion } from '@codemirror/autocomplete'
import { Button } from 'antd'
import Form from 'antd/lib/form'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Controller, useFieldArray, UseFormReturn } from 'react-hook-form'
import tw from 'twin.macro'
import { makeCompletionOptionsFromObjectKeys } from './codemirror-extensions'
import { CodeMirrorField } from './CodeMirrorField'
import { SelectComponent } from './fields'

type FieldProps = {
  field: IField
  form: UseFormReturn
}

type FieldArrayProps = FieldProps & {
  type: Ref<IAnyType>
}

type PropsFieldFactoryProps = {
  field: IField
  form: UseFormReturn
  // the state object from where we will get the keys to make autocomplete options
  context: { autoComplete?: IPropData }
}

const FieldArray = ({ field, form, type }: FieldArrayProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: field.key,
  })

  const createField = (id: string, index: number) => {
    return {
      key: `${field.key}.${index}`,
      type,
      id,
      description: field.description,
      name: `${field.key}.${index}`,
    }
  }

  return (
    <div css={tw`border-gray-500`}>
      {fields.map((subField, index) => (
        <div css={tw`flex m-1`}>
          <Field
            field={createField(subField.id, index)}
            form={form}
            key={subField.id}
          />
          <Button icon={<DeleteFilled />} onClick={() => remove(index)} />
        </div>
      ))}
      <Button icon={<PlusOutlined />} onClick={() => append({})} />
    </div>
  )
}

const Field = ({ field, form }: FieldProps) => {
  switch (field.type.current.kind) {
    case ITypeKind.ArrayType:
      return (
        <FieldArray
          field={field}
          form={form}
          type={field.type.current.itemType}
        />
      )
    case ITypeKind.ReactNodeType:
    case ITypeKind.RenderPropsType:
      return (
        <>
          <Controller
            control={form.control}
            name={`${field.key}.value`}
            render={(control) => (
              <SelectComponent
                name={control.field.name}
                onBlur={control.field.onBlur}
                onChange={control.field.onChange}
                ref={control.field.ref}
                value={control.field.value}
              />
            )}
          />
          <Controller
            control={form.control}
            defaultValue={field.type.current.id}
            name={`${field.key}.type`}
            render={(control) => <></>}
          />
        </>
      )
    case ITypeKind.PrimitiveType:
    default:
      return (
        <Controller
          control={form.control}
          name={field.key}
          render={(control) => (
            <CodeMirrorField
              defaultCompletionOptions={makeCompletionOptionsFromType(
                field.type.current,
              )}
              onBlur={control.field.onBlur}
              onChange={control.field.onChange}
              templateCompletionOptions={makeCompletionOptionsFromObjectKeys(
                {},
              )}
              value={control.field.value}
            />
          )}
        />
      )
  }
}

/**
 * Creates a field for the props form given a specific type for the field
 */
export const PropsFields = observer<PropsFieldFactoryProps>(
  ({
    field,
    form,
    // the state object from where we will get the keys to make autocomplete options
    context,
  }) => {
    return (
      <Form.Item label={field.name || toTitleCase(field.key)}>
        <Field field={field} form={form} />
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
