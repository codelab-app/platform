import {
  IAnyActionType,
  IArrayType,
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
import { CheckboxField } from './CheckboxField'
import { CodeMirrorField } from './CodeMirrorField'
import { SelectActionField } from './SelectActionField'
import { SelectComponentField } from './SelectComponentField'
import { SelectEnumField } from './SelectEnumField'

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

  if (
    isOfTypeKind<IField<IReactNodeType>>(field, ITypeKind.ReactNodeType) ||
    isOfTypeKind<IField<IRenderPropsType>>(field, ITypeKind.RenderPropsType)
  ) {
    return <SelectComponentField context={context} field={field} form={form} />
  }

  if (isOfTypeKind<IField<IAnyActionType>>(field, ITypeKind.ActionType)) {
    return <SelectActionField context={context} field={field} form={form} />
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

  if (isOfTypeKind<IField<IPrimitiveType>>(field, ITypeKind.PrimitiveType)) {
    return field.type.current.primitiveKind === IPrimitiveTypeKind.Boolean ? (
      <CheckboxField field={field} form={form} />
    ) : (
      <CodeMirrorField context={context} field={field} form={form} />
    )
  }

  if (isOfTypeKind<IField<IEnumType>>(field, ITypeKind.EnumType)) {
    return <SelectEnumField field={field} form={form} />
  }

  return <CodeMirrorField context={context} field={field} form={form} />
})
