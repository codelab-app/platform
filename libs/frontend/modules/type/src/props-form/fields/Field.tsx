import {
  IAnyActionType,
  IArrayType,
  ICodeMirrorType,
  IEnumType,
  IField,
  IFieldDTO,
  IInterfaceType,
  IPrimitiveType,
  IPrimitiveTypeKind,
  IPropsFieldContext,
  IReactNodeType,
  IRenderPropsType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { ArrayField } from './ArrayField'
// import { CheckboxField } from './CheckboxField'

export interface FieldProps {
  field: IFieldDTO
  form: UseFormReturn
  context?: IPropsFieldContext
}

const isOfTypeKind = <T extends IFieldDTO>(
  field: IFieldDTO,
  kind: ITypeKind,
): field is T => field.type.current.kind === kind

export const Field = observer(({ field, form, context }: FieldProps) => {
  if (isOfTypeKind<IField<IArrayType>>(field, ITypeKind.ArrayType)) {
    return (
      <ArrayField
        field={field}
        form={form}
        renderItemField={(itemField) => (
          <Field context={context} field={itemField} form={form} />
        )}
      />
    )
  }

  if (isOfTypeKind<IField<IInterfaceType>>(field, ITypeKind.InterfaceType)) {
    return (
      <>
        {[...field.type.current.fields.values()].map((f, i) => (
          <Field
            context={context}
            field={{
              description: f.description,
              id: f.id,
              type: f.type,
              key: `${field.key}.${f.key}`,
              name: `${field.key}.${f.key}`,
            }}
            form={form}
          />
        ))}
      </>
    )
  }
})
