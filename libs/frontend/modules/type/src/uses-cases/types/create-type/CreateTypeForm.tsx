import {
  DisplayIfField,
  FormUniforms,
  FormUniformsProps,
} from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { CreateTypeSchema, createTypeSchema } from './createTypeSchema'

export const DisplayIfKind = ({
  kind,
  children,
}: React.PropsWithChildren<{ kind: TypeKind }>) => (
  <DisplayIfField<CreateTypeSchema> condition={(c) => c.model.kind === kind}>
    {children}
  </DisplayIfField>
)

export const CreateTypeForm = (
  props: Omit<FormUniformsProps<CreateTypeSchema>, 'schema'>,
) => {
  return (
    <FormUniforms<CreateTypeSchema> schema={createTypeSchema} {...props}>
      <AutoFields fields={['name', 'kind']} />
      <DisplayIfKind kind={TypeKind.PrimitiveType}>
        <AutoField name={'primitiveKind'} />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.UnionType}>
        <AutoField
          createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
          name={'typeIdsOfUnionType'}
        />
      </DisplayIfKind>
      {/* <ListField name="unionTypes" />; */}
      <DisplayIfKind kind={TypeKind.EnumType}>
        <AutoField name={'allowedValues'} />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.ArrayType}>
        <TypeSelect name={'arrayItemTypeId'} label="Array item type" />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.ElementType}>
        <AutoField name={'elementKind'} label="Element kind" />
      </DisplayIfKind>
    </FormUniforms>
  )
}
